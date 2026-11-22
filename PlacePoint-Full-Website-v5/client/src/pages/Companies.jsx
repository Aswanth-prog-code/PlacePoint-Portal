import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { companyBank, categoryInfo } from './companyQuestionBank';
import { apiRequest, currentProfile, saveProgressToServer, studentStorageKey } from '../services/api';

const progressStorageKey = () => studentStorageKey('placepoint-company-progress', currentProfile()?.email);
const readProgress = () => { try { return JSON.parse(localStorage.getItem(progressStorageKey()) || '{}'); } catch { return {}; } };
const saveProgress = value => localStorage.setItem(progressStorageKey(), JSON.stringify(value));
function useCompanyProgress() {
  const email = currentProfile()?.email || 'guest';
  const [progress, setProgress] = useState(readProgress);
  useEffect(() => {
    let active = true;
    setProgress(readProgress());
    apiRequest('/progress').then(({ progress: serverProgress }) => {
      if (active && serverProgress?.companyProgress && Object.keys(serverProgress.companyProgress).length) {
        saveProgress(serverProgress.companyProgress);
        setProgress(serverProgress.companyProgress);
      }
    }).catch(error => console.warn('Company progress remains available locally:', error.message));
    return () => { active = false; };
  }, [email]);
  return [progress, setProgress];
}

export function CompaniesHome(){
  const [progress]=useCompanyProgress();
  const [companyType,setCompanyType]=useState('All');
  const companies=Object.entries(companyBank);
  const visibleCompanies=companies.filter(([,company])=>companyType==='All'||(companyType==='Product'?(company.type||'').toLowerCase().includes('product'):(company.type||'').toLowerCase().includes('services')||(company.type||'').toLowerCase().includes('consulting')));
  const total=companies.reduce((n,[_id,c])=>n+Object.values(c).filter(Array.isArray).reduce((m,a)=>m+a.length,0),0);
  const attempted=Object.values(progress).filter(x=>x?.answered).length;
  return <div className="company-page"><div className="page-heading"><div className="eyebrow">COMPANY-WISE PREPARATION</div><h1>Prepare for your <em>next opportunity.</em></h1><p>Choose a company and practise across behavioural, technical, coding and HR rounds. Question counts vary by company and are designed around common fresher hiring patterns.</p></div>
    <div className="company-overview-stats"><div><strong>{companies.length}</strong><span>Companies</span></div><div><strong>{total}</strong><span>Practice questions</span></div><div><strong>{attempted}</strong><span>Attempted</span></div><Link to="/companies/progress" className="company-progress-link">View company progress →</Link></div>
    <div className="company-type-filters" aria-label="Filter companies">{['All','Product','Services & consulting'].map(type=><button type="button" key={type} className={companyType===type?'active':''} onClick={()=>setCompanyType(type)}>{type}</button>)}</div>
    <div className="company-card-grid">{visibleCompanies.map(([_id,c])=><article className="company-card" key={_id}><div className={`company-logo ${_id}`} aria-hidden="true">{c.mark}</div><div className="company-card-copy"><span className="eyebrow">{c.type || 'COMPANY PREPARATION'}</span><h2>{c.name}</h2><p>{c.focus || 'Prepare across behavioural, technical, coding and HR interview rounds.'}</p><div className="company-card-meta">4 preparation modules <span>•</span> {Object.values(c).filter(Array.isArray).reduce((n,a)=>n+a.length,0)} practice questions</div><Link to={`/companies/${_id}`} className="btn-primary">Explore {c.name} <span>→</span></Link></div></article>)}</div>
  </div>;
}

export function CompanyModules(){ const {companyId}=useParams(); const company=companyBank[companyId]; const [progress]=useCompanyProgress(); if(!company)return <div className="content-page"><h2>Company not found</h2><Link to="/companies">Back to companies</Link></div>;
  return <div className="company-page"><Link to="/companies" className="back-link">← All companies</Link><div className="page-heading"><div className="eyebrow">{company.type || 'COMPANY PREPARATION'}</div><h1>{company.name} <em>interview prep.</em></h1><p>{company.focus || 'Choose a preparation module and practise for common fresher interview rounds.'}</p></div><div className="company-source-note">{company.sourceNote || 'Practice questions are educational preparation material. Actual interview rounds vary by role, campus and hiring year.'}</div><div className="company-module-grid">{categoryInfo.map(cat=>{const items=company[cat.key];const done=items.filter((_,i)=>progress[`${companyId}:${cat.key}:${i}`]?.answered).length;return <Link to={`/companies/${companyId}/${cat.key}`} className="company-module-card" key={cat.key}><div className="company-module-icon" aria-hidden="true">{cat.icon}</div><div><h3>{cat.title}</h3><p>{cat.desc}</p><small>{done} / {items.length} completed</small><div className="company-mini-progress"><i style={{width:`${done/items.length*100}%`}}/></div></div><span className="module-arrow" aria-hidden="true">→</span></Link>})}</div><Link to="/companies/progress" className="company-inline-link">View your company preparation progress →</Link></div>;
}

export function CompanyQuestionPractice(){
  const {companyId,category}=useParams(); const company=companyBank[companyId]; const categoryMeta=categoryInfo.find(x=>x.key===category); const questions=company?.[category]||[];
  const [index,setIndex]=useState(0); const [choice,setChoice]=useState(null); const [response,setResponse]=useState(''); const [revealed,setRevealed]=useState(false); const [progress,setProgress]=useCompanyProgress();
  useEffect(()=>{setIndex(0);setChoice(null);setResponse('');setRevealed(false);},[companyId,category]);
  const item=questions[index];
  const progressKey=`${companyId}:${category}:${index}`; const saved=progress[progressKey];
  function submit(){ if(!item)return; const correct=item.open?null:choice===item.correct; const next={...progress,[progressKey]:{answered:true,correct,updatedAt:new Date().toISOString()}}; setProgress(next);saveProgress(next);saveProgressToServer({companyProgress:next}).catch(error=>console.error('Company progress sync failed; saved locally for retry:',error.message));setRevealed(true); }
  function nextQuestion(){setIndex(i=>(i+1)%questions.length);setChoice(null);setResponse('');setRevealed(false);}
  function previousQuestion(){setIndex(i=>Math.max(0,i-1));setChoice(null);setResponse('');setRevealed(false);}
  if(!company||!categoryMeta||!item)return <div className="content-page"><h2>Question module not found</h2><Link to="/companies">Back to companies</Link></div>;
  const attempted=questions.filter((_,i)=>progress[`${companyId}:${category}:${i}`]?.answered).length;
  return <div className="company-page"><Link to={`/companies/${companyId}`} className="back-link">← {company.name} modules</Link><div className="question-practice-heading"><div><div className="eyebrow">{company.name.toUpperCase()} / {categoryMeta.title.toUpperCase()}</div><h1>{categoryMeta.title}</h1><p>Answer the question, review the feedback and study the suggested answer. These are practice prompts, not guaranteed past interview questions.</p></div><div className="question-count"><strong>{attempted}/{questions.length}</strong><span>completed</span></div></div>
    <div className="company-question-progress"><i style={{width:`${attempted/questions.length*100}%`}}/></div>
    <section className="company-question-card"><div className="question-card-meta"><span>QUESTION {index+1} OF {questions.length}</span><span>{item.open?'Written response':'Multiple choice'}</span>{item.sharedCore&&<span>Shared core question</span>}</div><h2>{item.question}</h2>
      {item.open ? <div className="company-written-answer"><label htmlFor="candidate-answer">Your answer</label><textarea id="candidate-answer" rows="5" value={response} onChange={e=>setResponse(e.target.value)} placeholder="Write your answer here..." disabled={revealed}/><small>There may be several good answers. Compare your response with the sample structure below.</small></div> : <div className="company-options">{item.options.map((option,i)=><button type="button" key={option} disabled={revealed} className={`company-option ${choice===i?'selected':''} ${revealed&&i===item.correct?'correct':''} ${revealed&&choice===i&&i!==item.correct?'incorrect':''}`} onClick={()=>setChoice(i)}><span>{String.fromCharCode(65+i)}</span>{option}{revealed&&i===item.correct&&<b>Correct answer</b>}</button>)}</div>}
      {!revealed ? <button className="btn-primary company-submit-answer" disabled={item.open?!response.trim():choice===null} onClick={submit}>{item.open?'Show sample answer':'Submit answer'} <span>→</span></button> : <div className={`company-feedback ${item.open?'review':choice===item.correct?'right':'wrong'}`}><strong>{item.open?'Response saved — compare with the sample answer.':choice===item.correct?'Correct! Well done.':'Incorrect. Review the correct answer below.'}</strong>{!item.open&&<p>{item.explanation}</p>}</div>}
      {revealed&&<div className="company-model-answer"><div className="eyebrow">{item.open?'SAMPLE ANSWER / GUIDANCE':'CORRECT ANSWER'}</div><p>{item.answer}</p></div>}
      <div className="company-question-actions"><button className="btn-secondary" onClick={previousQuestion} disabled={index===0}>← Previous</button><span>{saved?.answered?'Previously attempted':'Practice question'}</span><button className="btn-secondary" onClick={nextQuestion}>{index===questions.length-1?'Start again':'Next question'} →</button></div>
    </section><Link to="/companies/progress" className="company-inline-link">View overall company progress →</Link>
  </div>;
}

export function CompanyProgress(){
 const [progress]=useCompanyProgress(); const companies=Object.entries(companyBank); const all=companies.flatMap(([id,c])=>Object.entries(c).filter(Array.isArray).flatMap(([cat,items])=>items.map((item,i)=>({key:`${id}:${cat}:${i}`,id,cat,item}))));
 const done=all.filter(x=>progress[x.key]?.answered); const correct=done.filter(x=>progress[x.key]?.correct===true).length; const percent=all.length?Math.round(done.length/all.length*100):0;
 return <div className="company-page"><Link to="/companies" className="back-link">← All companies</Link><div className="page-heading"><div className="eyebrow">SEPARATE COMPANY TRACKER</div><h1>Your company <em>progress.</em></h1><p>This tracker is independent of your general aptitude and coding progress.</p></div><section className="company-progress-hero"><div><span>OVERALL COMPLETION</span><strong>{percent}%</strong><p>{done.length} of {all.length} questions attempted</p></div><div className="company-progress-ring" style={{'--company-progress':`${percent}%`}}><b>{percent}%</b></div></section><div className="company-progress-stats"><div><strong>{done.length}</strong><span>Attempted</span></div><div><strong>{correct}</strong><span>Correct MCQs</span></div><div><strong>{done.length-correct}</strong><span>Need review / written</span></div></div><div className="company-progress-list">{companies.map(([id,c])=>{const keys=all.filter(x=>x.id===id);const completed=keys.filter(x=>progress[x.key]?.answered).length;return <article key={id}><div className="company-progress-row-head"><strong>{c.name}</strong><span>{completed}/{keys.length} completed</span></div><div className="company-mini-progress"><i style={{width:`${completed/keys.length*100}%`}}/></div><div className="company-progress-categories">{categoryInfo.map(cat=>{const count=c[cat.key].filter((_,i)=>progress[`${id}:${cat.key}:${i}`]?.answered).length;return <span key={cat.key}>{cat.title.replace(' Questions','')}: {count}/{c[cat.key].length}</span>})}</div></article>})}</div></div>;
}
