import React, { useMemo, useState } from 'react';

const books = [
  {
    id: 'aptitude', title: 'Placement Aptitude Workbook', category: 'Aptitude', level: 'Beginner to intermediate', pages: 'Practice notes',
    description: 'Quantitative aptitude, logical reasoning, verbal ability, worked examples and a short answer key.',
    file: '/books/placepoint-aptitude-workbook.pdf', icon: '◈'
  },
  {
    id: 'core-cs', title: 'Core CS Interview Notes', category: 'Technical', level: 'Fresher revision', pages: 'Revision guide',
    description: 'OOP, DBMS, SQL, operating systems, computer networks, REST APIs, Git and testing fundamentals.',
    file: '/books/placepoint-core-cs-interview-notes.pdf', icon: '⌘'
  },
  {
    id: 'coding', title: 'Coding Patterns for Freshers', category: 'Coding', level: 'Beginner to intermediate', pages: 'Problem-solving guide',
    description: 'Hash maps, two pointers, sliding windows, stacks, queues, binary search, graphs and dynamic programming.',
    file: '/books/placepoint-coding-patterns-workbook.pdf', icon: '</>'
  },
  {
    id: 'interview', title: 'Interview & HR Playbook', category: 'Interview', level: 'All levels', pages: 'Preparation guide',
    description: 'Self-introduction, project explanations, STAR answers, resume checks and questions to ask interviewers.',
    file: '/books/placepoint-interview-hr-playbook.pdf', icon: '◎'
  }
];
const categories = ['All', 'Aptitude', 'Technical', 'Coding', 'Interview'];

export default function Books() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => books.filter(book =>
    (category === 'All' || book.category === category) &&
    `${book.title} ${book.description} ${book.category}`.toLowerCase().includes(search.toLowerCase().trim())
  ), [category, search]);

  return <div className="books-page">
    <div className="page-heading"><div><div className="eyebrow">PLACEPOINT LEARNING LIBRARY</div><h1>Books for your <em>next step.</em></h1><p>Download original placement-preparation notes and workbooks to your computer for offline study.</p></div><div className="books-library-stamp"><strong>{books.length}</strong><span>FREE GUIDES</span></div></div>
    <div className="books-library-note"><strong>Original PlacePoint resources</strong><span>These are original study guides created for this project, not copied from Scribd or paid books. They are not official company question papers.</span></div>
    <div className="books-toolbar"><label className="books-search"><span aria-hidden="true">⌕</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search books and topics" aria-label="Search books" /></label><div className="books-filters" aria-label="Filter books">{categories.map(item => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
    <div className="books-grid">{filtered.map(book => <article className="book-card" key={book.id}><div className={`book-cover book-cover-${book.category.toLowerCase()}`}><span>PLACEPOINT</span><strong>{book.icon}</strong><small>{book.category.toUpperCase()}</small></div><div className="book-card-content"><div className="book-card-meta"><span>{book.category}</span><span>{book.level}</span></div><h2>{book.title}</h2><p>{book.description}</p><div className="book-card-actions"><a className="btn-primary" href={book.file} download>Download PDF <span aria-hidden="true">↓</span></a><a className="book-preview-link" href={book.file} target="_blank" rel="noopener noreferrer">Preview</a></div></div></article>)}</div>
    {filtered.length === 0 && <div className="books-empty"><strong>No books found</strong><p>Try another keyword or select a different category.</p></div>}
    <p className="books-footnote">For personal learning and practice. Company hiring rounds and assessment formats can change by role, campus and year.</p>
  </div>;
}
