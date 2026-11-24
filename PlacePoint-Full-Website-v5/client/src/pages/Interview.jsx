import React, { useMemo, useState } from 'react';
import { apiRequest, isDemoMode, studentStorageKey } from '../services/api';

const languageBank = {
  C: [
    ['What is the difference between malloc() and calloc()?', 'malloc() allocates one block of uninitialised memory. calloc() allocates space for multiple elements and initialises the allocated bytes to zero.', 'Remember: allocation plus initialisation.'],
    ['What is a pointer in C?', 'A pointer is a variable that stores the memory address of another object or function.', 'Think about addresses and indirection.'],
    ['What is the difference between a structure and a union?', 'A structure gives each member separate storage. A union shares storage among its members, so typically only one member value is meaningful at a time.', 'Compare how memory is shared.'],
    ['What is a dangling pointer?', 'A dangling pointer refers to memory that is no longer valid, for example after the pointed-to object has been freed.', 'Consider what happens after free().'],
  ],
  'C++': [
    ['What is the difference between a class and a struct in C++?', 'Both can contain data and member functions. Their default access is different: class members are private by default, while struct members are public by default.', 'Focus on default access.'],
    ['What is function overloading?', 'Function overloading allows multiple functions to share a name when their parameter lists differ. The compiler resolves the call using the arguments.', 'Compare function signatures.'],
    ['What is a virtual function?', 'A virtual function enables runtime polymorphism: a call through a base-class pointer or reference can dispatch to an overridden derived-class function.', 'Think about runtime dispatch.'],
    ['What is the difference between a pointer and a reference?', 'A pointer stores an address and can be reassigned or null. A reference is an alias that must be initialised when declared and cannot be reseated.', 'Compare nullability and reassignment.'],
  ],
  Java: [
    ['What is the difference between JDK, JRE and JVM?', 'JVM executes Java bytecode. JRE provides the JVM and runtime libraries. JDK includes development tools such as the compiler in addition to runtime components.', 'Think execution, runtime, development.'],
    ['What is method overriding?', 'Overriding occurs when a subclass provides its own implementation of an inherited instance method with a compatible signature.', 'Think inheritance and same signature.'],
    ['Why is String immutable in Java?', 'A String object cannot be changed after creation. Immutability supports safe sharing, predictable hashing and security-sensitive uses.', 'Consider what happens when text is modified.'],
    ['What is the difference between an interface and an abstract class?', 'An interface defines a contract that classes can implement; an abstract class can also hold instance state and shared implementation. A class can implement multiple interfaces but extend only one class.', 'Compare multiple inheritance of type and shared state.'],
  ],
  Python: [
    ['What is the difference between a list and a tuple?', 'A list is mutable, while a tuple is immutable. Both are ordered sequence types and can contain mixed values.', 'Focus on whether elements can be reassigned.'],
    ['What is a dictionary in Python?', 'A dictionary is a mutable mapping that stores key-value pairs. Keys must be hashable and unique within the mapping.', 'Think key lookup.'],
    ['What is the purpose of __init__?', '__init__ is an initialisation method called after a new instance is created; it commonly sets up instance attributes.', 'Think object setup.'],
    ['What is the difference between == and is?', '== checks value equality. is checks whether two references point to the same object.', 'Value versus identity.'],
  ],
  JavaScript: [
    ['What is the difference between let, const and var?', 'let and const are block-scoped; var is function-scoped. const prevents reassignment of the binding, though an object it references may still be mutated.', 'Compare scope and reassignment.'],
    ['What is a Promise?', 'A Promise represents the eventual success or failure of an asynchronous operation and can be handled with then(), catch() or await.', 'Think pending, fulfilled and rejected.'],
    ['What is the difference between == and ===?', '== performs equality comparison with type coercion in many cases; === compares without coercing types.', 'Think implicit conversion.'],
    ['What is a closure?', 'A closure is a function together with access to variables from its surrounding lexical scope, even when that outer function has finished executing.', 'Think function plus remembered scope.'],
  ],
  'C#': [
    ['What is the difference between a value type and a reference type?', 'A value-type variable contains its value; a reference-type variable holds a reference to an object. Structs and enums are value types; classes are reference types.', 'Compare what the variable represents.'],
    ['What is an interface in C#?', 'An interface defines a contract of members that implementing types provide. A class or struct can implement multiple interfaces.', 'Think contract.'],
    ['What is garbage collection?', 'The .NET garbage collector automatically reclaims managed memory occupied by objects that are no longer reachable.', 'Think managed heap and reachability.'],
  ],
  PHP: [
    ['What is the difference between GET and POST?', 'GET typically requests a resource and sends parameters in the URL. POST submits data in the request body and is commonly used for creating or processing data.', 'Compare where request data is carried and intent.'],
    ['What is a PHP session?', 'A session stores user-specific data across multiple requests, commonly using a session identifier stored in a browser cookie.', 'Think state across requests.'],
    ['What is the difference between include and require?', 'Both load another PHP file. require causes a fatal error if the file cannot be loaded, while include raises a warning and execution can continue.', 'Think failure behaviour.'],
  ],
  Go: [
    ['What is a goroutine?', 'A goroutine is a lightweight concurrent function managed by the Go runtime.', 'Think lightweight concurrency.'],
    ['What is a channel in Go?', 'A channel is a typed communication mechanism through which goroutines can send and receive values.', 'Think communication between goroutines.'],
    ['What is the zero value in Go?', 'The zero value is the default value a variable receives when declared without an explicit initial value, such as 0, false or an empty string.', 'Think default initialisation.'],
  ],
  SQL: [
    ['What is the difference between WHERE and HAVING?', 'WHERE filters rows before grouping; HAVING filters groups after GROUP BY and can use aggregate conditions.', 'Before grouping versus after grouping.'],
    ['What is a primary key?', 'A primary key uniquely identifies each row in a table and cannot contain NULL values.', 'Think unique row identity.'],
    ['What is the difference between INNER JOIN and LEFT JOIN?', 'INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from the left table and matching rows from the right, using NULL where there is no match.', 'Think which side is preserved.'],
  ],
  Kotlin: [
    ['What is the difference between val and var?', 'val declares a read-only binding that cannot be reassigned; var declares a mutable binding that can be reassigned.', 'Think reassignment.'],
    ['What is a nullable type in Kotlin?', 'A nullable type explicitly allows null, written with a question mark after the type, such as String?.', 'Look at the type notation.'],
  ],
  Swift: [
    ['What is the difference between let and var in Swift?', 'let declares a constant binding and var declares a variable binding that can be changed.', 'Think constant versus variable.'],
    ['What is an optional in Swift?', 'An optional represents a value that may be present or nil, making the possibility of absence explicit in the type system.', 'Think safe handling of missing values.'],
  ],
  Rust: [
    ['What is ownership in Rust?', 'Ownership is Rust’s system for managing memory through rules about which variable owns a value and when that value is dropped.', 'Think who is responsible for a value.'],
    ['What is the difference between &T and &mut T?', '&T is an immutable borrow; &mut T is a mutable borrow that permits mutation while following Rust’s borrowing rules.', 'Think read-only versus mutable borrowing.'],
  ],
};

const commonBank = [
  ['OOP', 'Explain the four main principles of object-oriented programming.', 'Encapsulation bundles data and methods; abstraction exposes essential behaviour; inheritance reuses or extends behaviour; polymorphism allows one interface to have different implementations.', 'Think about protecting data, hiding detail, reuse and many forms.'],
  ['DBMS', 'What is database normalisation?', 'Normalisation organises relational tables to reduce unnecessary duplication and update anomalies, commonly by decomposing tables and defining relationships.', 'Think redundancy and update anomalies.'],
  ['DSA', 'What is the difference between a stack and a queue?', 'A stack follows last-in, first-out (LIFO). A queue follows first-in, first-out (FIFO).', 'Think which item leaves first.'],
  ['SQL', 'Write the purpose of GROUP BY in SQL.', 'GROUP BY groups rows that share values in selected columns, often so aggregate functions such as COUNT, SUM or AVG can be applied per group.', 'Think aggregate calculations per category.'],
  ['Web', 'What happens when a browser sends an HTTP request to a server?', 'The client sends a request with a method, path, headers and sometimes a body. The server processes it and returns a response with a status code, headers and optional body.', 'Think request and response.'],
  ['Problem solving', 'How would you approach finding the second-largest distinct number in an array?', 'Track the largest and second-largest distinct values in one pass, updating them as each element is examined. Handle arrays with fewer than two distinct values.', 'Try maintaining two running values.'],
  ['HR', 'Tell me about yourself.', 'Give a concise introduction: your current education or role, relevant skills, one project or achievement, and the kind of opportunity you are seeking. Adapt it to the role.', 'Use present, evidence, goal.'],
  ['HR', 'Describe a challenge you faced and how you handled it.', 'Use the STAR structure: Situation, Task, Action and Result. Be specific about your own contribution and what you learned.', 'Structure your answer with STAR.'],
  ['HR', 'Why do you want to join our company?', 'Connect a genuine aspect of the company or role to your skills and goals. Mention how you can contribute and what you hope to learn.', 'Research the role; avoid generic praise.'],
  ['HR', 'What are your strengths and one area you are improving?', 'Choose strengths supported by examples. Name a genuine development area and explain the concrete steps you are taking to improve it.', 'Pair honesty with an improvement plan.'],
];

const allLanguages = Object.keys(languageBank);
const shuffle = items => [...items].sort(() => Math.random() - 0.5);

export default function Interview() {
  const savedProfile = useMemo(() => { try { return JSON.parse(localStorage.getItem('placepoint-profile') || '{}'); } catch { return {}; } }, []);
  const [selected, setSelected] = useState(() => savedProfile.languages || []);
  const [stage, setStage] = useState('setup');
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [paper, setPaper] = useState(false);
  const [category, setCategory] = useState('Mixed interview');

  const toggle = language => setSelected(current => current.includes(language) ? current.filter(item => item !== language) : [...current, language]);
  function beginInterview() {
    if (!selected.length) return;
    const languageQuestions = selected.flatMap(language => (languageBank[language] || []).map(q => ({ domain: language, question: q[0], answer: q[1], hint: q[2] })));
    const shared = commonBank.map(q => ({ domain: q[0], question: q[1], answer: q[2], hint: q[3] }));
    const chosen = category === 'Technical only' ? [...shuffle(languageQuestions).slice(0, 6), ...shuffle(shared.filter(q => ['OOP','DBMS','DSA','SQL','Web','Problem solving'].includes(q.domain))).slice(0, 4)]
      : category === 'HR only' ? shuffle(shared.filter(q => q.domain === 'HR')).slice(0, 4)
      : [...shuffle(languageQuestions).slice(0, 5), ...shuffle(shared).slice(0, 5)];
    const finalSet = shuffle(chosen).slice(0, 10);
    setQuestions(finalSet); setAnswers({}); setIndex(0); setShowAnswer(false); setPaper(false); setStage('mock');
  }
  async function finishInterview() {
    const completed = { date: new Date().toISOString(), languages: selected, answers, questions, category };
    localStorage.setItem(studentStorageKey('placepoint-last-interview', savedProfile?.email), JSON.stringify(completed));
    if (!isDemoMode && savedProfile?.email) {
      try {
        await apiRequest('/interviews', { method: 'POST', body: JSON.stringify({ languages: selected, answers, questions, category }) });
      } catch (error) { console.error('Interview sync failed:', error.message); }
    }
    setStage('result'); setPaper(true);
  }
  const current = questions[index];
  const answeredCount = Object.values(answers).filter(value => value.trim()).length;

  return <div className="learning-page interview-page">
    <div className="page-intro"><div><div className="eyebrow">CAREER READINESS / 04</div><h1>Prepare. Practise. <em>Perform.</em></h1><p>Personalised technical and HR mock interviews, followed by a revision paper you can study.</p></div><div className="intro-stamp interview-stamp"><span>Q&A</span><small>BE<br/>READY</small></div></div>

    <div className="interview-language-notice"><span aria-hidden="true">✦</span><div><strong>Build confidence in at least two programming languages.</strong><p>PlacePoint recommends completing practice in two or more languages before placement interviews. You can still start a mock interview with the languages you currently know.</p></div></div>

    <div className="interview-flow-tabs"><button className={stage === 'setup' ? 'active' : ''} onClick={() => setStage('setup')}>01 · Your languages</button><button className={stage === 'mock' ? 'active' : ''} disabled={!questions.length} onClick={() => setStage('mock')}>02 · Mock interview</button><button className={stage === 'result' ? 'active' : ''} disabled={!paper} onClick={() => setStage('result')}>03 · Revision paper</button></div>

    {stage === 'setup' && <section className="interview-panel interview-setup"><div className="panel-kicker">PERSONALISE YOUR INTERVIEW</div><h2>Which programming languages do you know?</h2><p>Select the languages you can currently use. Your technical questions will be selected from these languages, along with core CS and HR topics.</p><div className="interview-language-grid">{allLanguages.map(language => <label key={language} className={selected.includes(language) ? 'chosen' : ''}><input type="checkbox" checked={selected.includes(language)} onChange={() => toggle(language)}/><span>{language}</span><b>{selected.includes(language) ? '✓' : '+'}</b></label>)}</div><div className="interview-config-row"><label>Interview type<select value={category} onChange={e => setCategory(e.target.value)}><option>Mixed interview</option><option>Technical only</option><option>HR only</option></select></label><div className="interview-selected-count"><strong>{selected.length}</strong><span>languages selected</span></div></div>{selected.length < 2 && <div className="interview-reminder">You have selected {selected.length} language(s). Aim to practise at least two languages to broaden your preparation.</div>}<button className="btn-primary" onClick={beginInterview} disabled={!selected.length}>Start mock interview <span>→</span></button></section>}

    {stage === 'mock' && current && <section className="interview-panel mock-interview-panel"><div className="mock-topline"><div><div className="panel-kicker">LIVE PRACTICE SESSION</div><h2>{category}</h2></div><span className="mock-counter">QUESTION {index + 1} / {questions.length}</span></div><div className="coding-progress-line"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }}/></div><div className="mock-domain-row"><span>{current.domain}</span><span>{selected.length} selected language(s)</span></div><h3 className="mock-question-text">{current.question}</h3><label className="mock-answer-label">Your answer<textarea rows="5" value={answers[index] || ''} onChange={e => setAnswers(old => ({ ...old, [index]: e.target.value }))} placeholder="Type your answer here. Explain the idea in your own words..."/></label><div className="mock-guidance">Interview tip: speak clearly, define the concept, explain how it works and give a small example where possible.</div><div className="mock-actions"><button className="btn-secondary" onClick={() => {setShowAnswer(!showAnswer)}}>{showAnswer ? 'Hide' : 'View'} suggested answer</button><div><button className="btn-secondary" disabled={index === 0} onClick={() => {setIndex(i => i - 1);setShowAnswer(false)}}>Back</button>{index < questions.length - 1 ? <button className="btn-primary" onClick={() => {setIndex(i => i + 1);setShowAnswer(false)}}>Next question <span>→</span></button> : <button className="btn-primary" onClick={finishInterview}>Finish interview <span>✓</span></button>}</div></div>{showAnswer && <div className="suggested-answer"><strong>Suggested answer</strong><p>{current.answer}</p><small>{current.hint}</small></div>}</section>}

    {stage === 'result' && <><section className="interview-result-hero"><div><div className="panel-kicker">SESSION COMPLETED</div><h2>Your interview revision paper is ready.</h2><p>You attempted {answeredCount} of {questions.length} answer fields. Review every model answer and practise explaining it aloud.</p></div><div className="interview-result-stat"><strong>{answeredCount}/{questions.length}</strong><span>answers written</span></div></section><section className="interview-panel revision-paper"><div className="revision-paper-heading"><div><div className="panel-kicker">YOUR PERSONAL STUDY SHEET</div><h2>Mock Interview – Questions & Answers</h2><p>Includes language-specific questions, core technical topics and HR preparation from this session.</p></div><button className="btn-primary" onClick={() => window.print()}>Print / Save PDF <span>↗</span></button></div>{questions.map((q,i)=><article className="revision-question" key={`${q.domain}-${i}`}><div className="revision-q-meta"><span>{String(i+1).padStart(2,'0')}</span><b>{q.domain}</b></div><h3>{q.question}</h3><p className="revision-your-answer"><strong>Your answer:</strong> {answers[i]?.trim() || 'Not attempted – study the suggested answer below.'}</p><div className="revision-model-answer"><strong>Suggested answer</strong><p>{q.answer}</p><small>Quick recall: {q.hint}</small></div></article>)}<div className="revision-footer-note"><strong>Quick revision method</strong><p>Read the question, cover the suggested answer, explain it aloud in 60–90 seconds, then compare your explanation with the key points. Revisit any topic you could not explain clearly.</p></div></section><button className="btn-secondary" onClick={() => {setStage('setup');setPaper(false)}}>Start another mock interview</button></>}

    <div className="interview-resource-note"><strong>About these questions</strong><p>Questions are original practice prompts based on commonly taught programming and computer-science interview topics. They are not copied from GeeksforGeeks or any company’s confidential interview paper. Model answers are study guides; adapt them to your own experience.</p></div>
  </div>;
}
