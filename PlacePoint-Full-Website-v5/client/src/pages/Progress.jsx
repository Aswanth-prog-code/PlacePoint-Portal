import React, { useEffect, useState } from 'react';
import { apiRequest, currentProfile, saveProgressToServer, studentStorageKey } from '../services/api';
import { CODING_PROBLEM_COUNT } from './Coding';
import { companyBank, categoryInfo } from './companyQuestionBank';

function readJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } }
function percent(value) { return `${Math.max(0, Math.min(100, Math.round(value || 0)))}%`; }
function hasRecords(value) { return value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0; }

export default function Progress(){
  const [, refresh] = useState(0);
  const profile=currentProfile() || {};
  const email=profile.email || 'guest';
  const aptitudeResultsKey=studentStorageKey('placepoint-aptitude-results',email);
  const aptitudeDetailKey=studentStorageKey('placepoint-aptitude-detail',email);
  const codingKey=studentStorageKey('placepoint-coding-completed',email);
  const companyProgressKey=studentStorageKey('placepoint-company-progress',email);
  const pendingKey=studentStorageKey('placepoint-pending-progress',email);
  useEffect(() => {
    if (!profile.email) return;
    let active=true;
    async function sync(){
      const pending=readJSON(pendingKey,{});
      try {
        const { progress } = await apiRequest('/progress');
        if (progress && active) {
          if (!hasRecords(pending.aptitudeResults) && hasRecords(progress.aptitudeResults)) localStorage.setItem(aptitudeResultsKey, JSON.stringify(progress.aptitudeResults));
          if (!Object.prototype.hasOwnProperty.call(pending, 'aptitudeLatest') && progress.aptitudeLatest && typeof progress.aptitudeLatest === 'object' && Object.keys(progress.aptitudeLatest).length) localStorage.setItem(aptitudeDetailKey, JSON.stringify(progress.aptitudeLatest));
          if (!hasRecords(pending.codingCompleted) && hasRecords(progress.codingCompleted)) localStorage.setItem(codingKey, JSON.stringify(progress.codingCompleted));
          if (!hasRecords(pending.companyProgress) && hasRecords(progress.companyProgress)) localStorage.setItem(companyProgressKey, JSON.stringify(progress.companyProgress));
        }
      } catch (error) { console.warn('Could not load server progress; local progress is preserved:', error.message); }
      try {
        if (hasRecords(pending)) await saveProgressToServer(pending);
        if (active) refresh(value=>value+1);
      } catch (error) { console.warn('Pending progress sync will retry later:', error.message); }
    }
    sync();
    return ()=>{active=false;};
  }, [profile.email]);
  const aptitudeDetail=readJSON(aptitudeDetailKey,null);
  const aptitudeResults=readJSON(aptitudeResultsKey,{});
  const aptitudeEntries=Object.values(aptitudeResults);
  const aptitude=aptitudeEntries.length?Math.round(aptitudeEntries.reduce((sum,item)=>sum+(Number(item.percent)||0),0)/aptitudeEntries.length):Number(localStorage.getItem(studentStorageKey('placepoint-aptitude-percent',email))||0);
  const coding=readJSON(codingKey,{});
  const companyProgress=readJSON(companyProgressKey,{});
  const companyStats=Object.entries(companyBank).map(([id,company])=>{const total=categoryInfo.reduce((sum,cat)=>sum+(company[cat.key]?.length||0),0);const attempted=categoryInfo.reduce((sum,cat)=>sum+(company[cat.key]||[]).filter((_,i)=>companyProgress[`${id}:${cat.key}:${i}`]?.answered).length,0);return {id,name:company.name,total,attempted,percent:total?Math.round(attempted/total*100):0};});
  const companyQuestionsTotal=companyStats.reduce((sum,item)=>sum+item.total,0);
  const companyQuestionsDone=companyStats.reduce((sum,item)=>sum+item.attempted,0);
  const codingItems=Object.entries(coding).filter(([,done])=>done);
  const languages=profile.languages||[];
  const codingTarget=Math.max(1,languages.length*CODING_PROBLEM_COUNT);
  const codingPercent=Math.min(100,Math.round(codingItems.length/codingTarget*100));
  const overall=Math.round((aptitude+codingPercent)/2);
  const companies=profile.companies||[];
  const recommendation=overall<30?'Start with beginner aptitude questions and programming fundamentals.':overall<60?'Practise intermediate questions and complete coding problems consistently.':overall<80?'Focus on advanced problem-solving, timed mock tests and interview preparation.':'Maintain your practice and revise weak topics before assessments.';
  const languageStats=languages.map(language=>{const count=codingItems.filter(([key])=>key.startsWith(`${language}::`)).length;return {language,count,percent:Math.min(100,Math.round(count/CODING_PROBLEM_COUNT*100))};});
  return <div className="learning-page"><div className="page-intro"><div><div className="eyebrow">YOUR WORK, AT A GLANCE</div><h1>Progress <em>in motion.</em></h1><p>Your preparation snapshot, based on practice completed in this browser and synced to your account.</p></div><div className="intro-stamp progress-stamp"><span>↗</span><small>KEEP<br/>GOING</small></div></div>
    <div className="performance-hero"><div><span className="panel-kicker">OVERALL PREPARATION SCORE</span><strong>{percent(overall)}</strong><p>Combined snapshot of aptitude results and completed coding practice.</p></div><div className="performance-ring" style={{'--progress':`${overall*3.6}deg`}}><span>{percent(overall)}</span></div></div>
    <div className="progress-grid"><article><span className="progress-icon violet" aria-hidden="true">◈</span><small>APTITUDE PERFORMANCE</small><strong>{percent(aptitude)}</strong><p>{aptitudeDetail?`${aptitudeDetail.score}/${aptitudeDetail.total} correct · ${aptitudeDetail.level} ${aptitudeDetail.topic}`:'Complete a practice set to see your score.'}</p></article><article><span className="progress-icon blue" aria-hidden="true">⌘</span><small>CODING PRACTICE</small><strong>{codingItems.length}</strong><p>Problems marked complete across your selected languages. Estimated checklist completion: {percent(codingPercent)}.</p></article><article><span className="progress-icon orange" aria-hidden="true">◎</span><small>LANGUAGES SELECTED</small><strong>{languages.length}</strong><p>{languages.join(', ')||'No languages selected in profile.'}</p></article></div>
    <section className="section-heading compact"><div><div className="eyebrow">APTITUDE BREAKDOWN</div><h2>Topic and level scores</h2></div></section><div className="language-progress-list">{aptitudeEntries.length?aptitudeEntries.map(item=><div className="language-progress-row" key={`${item.level}-${item.topic}`}><strong>{item.topic}</strong><div className="coding-progress-line"><span style={{width:percent(item.percent)}}></span></div><b>{percent(item.percent)}</b><small>{item.level}</small></div>):<p className="progress-empty">Complete aptitude practice sets to see your topic-wise percentages.</p>}</div>
    <section className="section-heading compact"><div><div className="eyebrow">LANGUAGE BREAKDOWN</div><h2>Your programming progress</h2></div></section><div className="language-progress-list">{languageStats.length?languageStats.map(item=><div className="language-progress-row" key={item.language}><strong>{item.language}</strong><div className="coding-progress-line"><span style={{width:percent(item.percent)}}></span></div><b>{percent(item.percent)}</b><small>{item.count} completed / {CODING_PROBLEM_COUNT}</small></div>):<p className="progress-empty">Add the languages you know in your profile to see a breakdown here.</p>}</div>
    <section className="section-heading compact"><div><div className="eyebrow">YOUR CAREER TARGETS</div><h2>Company readiness estimate</h2></div></section><div className="company-readiness-list">{companies.length?companies.map(company=><article key={company}><div><strong>{company}</strong><small>Preparation estimate based on your current PlacePoint activity</small></div><b>{percent(overall)}</b><div className="coding-progress-line"><span style={{width:percent(overall)}}></span></div></article>):<p className="progress-empty">No target companies found. Update your profile to add the companies you want to apply to.</p>}</div>
    <section className="section-heading compact"><div><div className="eyebrow">COMPANY INTERVIEW PREPARATION</div><h2>Your company-wise practice</h2><p>{companyQuestionsDone} of {companyQuestionsTotal} company practice questions attempted across {companyStats.length} companies.</p></div></section><div className="company-progress-report">{companyStats.map(company=><article key={company.id}><div className="company-progress-report-head"><strong>{company.name}</strong><span>{company.attempted} / {company.total} · {company.percent}%</span></div><div className="coding-progress-line"><span style={{width:percent(company.percent)}}></span></div></article>)}</div>
    <div className="recommendation-card"><div className="recommendation-icon">✦</div><div><span className="panel-kicker">YOUR NEXT RECOMMENDATION</span><h3>{overall<40?'Build your foundation':overall<75?'Strengthen your preparation':'Polish your placement readiness'}</h3><p>{recommendation}</p><small>Suggested next step: {aptitude<50?'complete another aptitude practice set':codingPercent<50?'solve and mark more programming problems':'revise advanced topics and practise interview questions'}.</small></div></div>
    <div className="progress-disclaimer"><strong>Important: readiness is an indicative estimate, not a company hiring score.</strong><p>Each selected language has {CODING_PROBLEM_COUNT} coding problems (9 Beginner, 10 Intermediate and 10 Advanced). Percentages are based on completed PlacePoint activities, not verified company-specific hiring criteria.</p></div>
  </div>;
}
