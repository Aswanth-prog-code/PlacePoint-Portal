const q = (question, options, correct, answer, explanation = '') => ({ question, options, correct, answer, explanation });
const open = (question, answer) => ({ question, open: true, answer });
export const companyBank = {
  amazon: {
    name: 'Amazon', mark: 'a',
    behavioural: [
      open('Tell me about a time you took ownership of a task outside your responsibility.', 'Use STAR: describe the situation, the responsibility you noticed, the specific actions you took, and the measurable result. Emphasise that you followed through rather than waiting for someone else.'),
      open('Describe a time you disagreed with a teammate. How did you handle it?', 'Explain the different viewpoints respectfully, how you used facts or testing to compare them, the decision the team made, and how you supported that decision.'),
      open('Tell me about a time you had to deliver a result under a tight deadline.', 'Explain the deadline and challenge, how you prioritised essential work, communicated progress, handled risks, and what was delivered.'),
      open('Describe a mistake you made and what you learned from it.', 'Own the mistake, explain its impact, describe how you corrected it, and mention the repeatable process you introduced to prevent it happening again.')
    ],
    technical: [
      q('Which data structure follows Last In, First Out (LIFO)?',['Queue','Stack','Linked List','Tree'],1,'A Stack follows LIFO. The last element inserted is the first one removed.','Common operations are push and pop.'),
      q('What is the average time complexity of searching in a well-distributed HashMap?',['O(1)','O(n)','O(log n)','O(n²)'],0,'Average-case lookup is O(1), assuming a good hash function and manageable collisions.','Worst-case behaviour can be O(n) in a simple collision model.'),
      q('Which SQL command is used to retrieve records?',['INSERT','UPDATE','SELECT','DELETE'],2,'SELECT retrieves data from one or more database tables.','Example: SELECT * FROM Students;'),
      q('What does REST commonly use to identify and operate on resources?',['URL endpoints and HTTP methods','CSS selectors','Compiler directives','Memory addresses'],0,'REST APIs expose resources through endpoints and use HTTP methods such as GET, POST, PUT/PATCH and DELETE.','')
    ],
    coding: [
      q('What is the output of `console.log(2 + "3")` in JavaScript?',['5','23','NaN','Error'],1,'The output is "23" because + performs string concatenation when one operand is a string.',''),
      q('Which approach efficiently finds two numbers that add to a target in an unsorted array?',['Nested loops only','Hash map of seen values','Sort and inspect only the first item','Binary search without sorting'],1,'A hash map stores previously seen values. For each number, check whether target - number is already present. Average time complexity: O(n).',''),
      q('What is the time complexity of binary search on a sorted array?',['O(n)','O(n²)','O(log n)','O(1)'],2,'Binary search halves the remaining search range at each step, giving O(log n) time.','The input must be sorted.'),
      q('Which condition is the usual base case for factorial recursion?',['n === 0 returns 1','n === 0 returns 0','n increases forever','Return the input unchanged'],0,'The base case is factorial(0) = 1. It stops recursion; otherwise the function calls factorial(n - 1).','')
    ],
    hr: [
      open('Tell me about yourself.', 'Keep it to about 60–90 seconds: your degree and current year, relevant technical skills, one project with your contribution, and the kind of role you are seeking.'),
      open('Why do you want to work at Amazon?', 'Connect your interest in solving customer problems and building reliable software to Amazon’s products and leadership principles. Include a specific reason and avoid generic praise.'),
      open('What is your greatest strength?', 'Choose a genuine strength relevant to the role, give a brief example that demonstrates it, and explain how it helps you contribute.'),
      open('Why should we hire you as a fresher?', 'Highlight your fundamentals, practical project experience, learning ability, collaboration and willingness to take responsibility. Be honest about what you are still learning.')
    ]
  },
  google: {
    name: 'Google', mark: 'G',
    behavioural: [
      open('Describe a challenging technical problem you solved.', 'Use STAR. Explain the technical obstacle, how you investigated it, the alternatives you considered, the solution you implemented, and the result.'),
      open('Tell me about a time you received difficult feedback.', 'Describe the feedback without becoming defensive, explain what you changed, and show how the change improved your work.'),
      open('Give an example of learning a new technology independently.', 'Explain why you needed it, the documentation or resources you used, the small experiment you built, and how you applied the learning.'),
      open('Tell me about a time you improved an existing process.', 'Identify the inefficiency, explain the improvement you proposed, how you measured its impact, and what changed for the team.')
    ],
    technical: [
      q('Which traversal explores a graph level by level?',['DFS','BFS','In-order traversal','Backtracking'],1,'Breadth-First Search (BFS) explores neighbouring vertices level by level and commonly uses a queue.','BFS finds shortest paths in unweighted graphs.'),
      q('What is the main idea of dynamic programming?',['Repeat every calculation','Store results of overlapping subproblems','Always use recursion without storage','Sort all input first'],1,'Dynamic programming stores subproblem results so they are not recomputed. It is useful when a problem has overlapping subproblems and optimal substructure.',''),
      q('Which structure is commonly used to implement a priority queue efficiently?',['Binary heap','Stack','Plain unsorted string','Adjacency matrix'],0,'A binary heap supports efficient priority-queue operations. Insert and remove-min/max are typically O(log n).',''),
      q('What is database indexing mainly used for?',['Encrypting rows','Speeding up data retrieval','Removing duplicate tables','Replacing database backups'],1,'An index helps the database locate matching records faster, often avoiding a full table scan. Indexes use extra storage and can add write overhead.','')
    ],
    coding: [
      q('For the Two Sum problem, what is the average time complexity of a hash-map solution?',['O(n²)','O(n log n)','O(n)','O(2ⁿ)'],2,'The hash-map approach scans the array once and performs average O(1) lookups, so total average time is O(n).',''),
      q('Which algorithm is suitable for shortest paths in an unweighted graph?',['BFS','Quick Sort','Binary Search','Heap Sort'],0,'BFS finds the shortest path in an unweighted graph because it explores vertices in increasing distance from the source.',''),
      q('What does the sliding-window technique help with?',['Only sorting linked lists','Processing contiguous ranges efficiently','Compiling source code','Creating database schemas'],1,'Sliding window maintains a moving range over an array or string, often reducing repeated work for contiguous subarray or substring problems.',''),
      q('Which technique is commonly used to detect a cycle in a singly linked list with O(1) extra space?',['Merge sort','Floyd’s slow and fast pointers','Binary search','Counting sort'],1,'Floyd’s cycle detection moves one pointer by one node and another by two. If they meet, a cycle exists.','')
    ],
    hr: [
      open('Why do you want to work at Google?', 'Mention a genuine interest in Google’s engineering problems, products or technical culture. Connect it to your skills and explain how you hope to contribute and learn.'),
      open('Where do you see yourself in five years?', 'Describe a realistic direction: becoming a dependable software engineer, deepening technical skills, taking ownership of features, and helping teammates.'),
      open('How do you handle a problem when you do not know the answer?', 'Explain how you clarify the problem, break it into smaller parts, consult documentation or reliable sources, test assumptions, and communicate when you need help.'),
      open('Tell me about a project you are proud of.', 'Describe the problem, intended users, your individual contribution, the technology choices, one challenge, and what you would improve next.')
    ]
  }
};
export const categoryInfo = [
  { key: 'behavioural', title: 'Behavioural Questions', desc: 'Use real examples and the STAR method.', icon: '✦' },
  { key: 'technical', title: 'Technical Questions', desc: 'Check core computer science concepts.', icon: '⌘' },
  { key: 'coding', title: 'Coding Questions', desc: 'Practise logic, algorithms and output questions.', icon: '</>' },
  { key: 'hr', title: 'HR Questions', desc: 'Prepare clear and confident responses.', icon: '◎' }
];


// Expanded interview-preparation bank: 25 prompts per category for each company.
companyBank.amazon.behavioural.push(...[open('Describe a time you had to learn from a failure.', 'Own your part, explain the impact, show the correction, and identify the specific habit or safeguard you adopted afterward.'),
open('Tell me about a time you challenged an existing approach.', 'Explain the current approach fairly, the evidence behind your alternative, how you tested it, and how you handled the decision.'),
open('Describe a situation where you had multiple urgent tasks.', 'Explain how you assessed impact and deadlines, agreed priorities, communicated trade-offs, and delivered the highest-value work.'),
open('Tell me about a time you received feedback you initially disagreed with.', 'Describe the feedback, how you checked it objectively, what you changed or clarified, and the result.'),
open('Give an example of how you handled conflict within a team.', 'Focus on listening, separating facts from assumptions, agreeing on a shared goal, and resolving the issue professionally.'),
open('Describe a time you improved quality even though the deadline was close.', 'Explain the risk, the minimum essential quality checks, how you prioritised them, and the defects or rework avoided.'),
open('Tell me about a time you influenced someone without authority.', 'Show how you understood their concern, used evidence or a small prototype, and reached agreement without relying on your position.'),
open('Describe a time you had to communicate a technical issue to a non-technical person.', 'Avoid jargon. Explain the impact, options, recommendation, and next step in terms relevant to the listener.'),
open('Tell me about a time you spotted a risk before it became a problem.', 'Explain the signal you noticed, how you assessed likelihood and impact, the preventive action, and what was avoided.'),
open('Describe a time you worked with someone whose style differed from yours.', 'Explain the difference respectfully, how you adapted communication and working agreements, and how the team delivered.'),
open('Tell me about a time you had to change your plan suddenly.', 'Describe what changed, how you re-evaluated priorities, who you informed, and how you maintained progress.'),
open('Give an example of a goal you set and achieved.', 'Make the goal measurable, describe milestones and obstacles, and provide evidence of the outcome.'),
open('Describe a time you made a process more reliable.', 'Identify failure points, explain the checks or automation you added, and compare reliability before and after.'),
open('Tell me about a time you had to defend a user-focused decision.', 'Connect the decision to a real user need, evidence you gathered, trade-offs considered, and the impact.'),
open('Describe a time you had to collaborate across different roles.', 'Explain each role’s needs, how you aligned expectations and dependencies, and the shared result.'),
open('Tell me about a time you had to deliver difficult news.', 'Be direct and timely, explain facts and impact, take responsibility where appropriate, and offer a recovery plan.'),
open('Give an example of when you went beyond the minimum requirement.', 'Choose a relevant example, explain why the extra work mattered, and quantify the benefit without exaggerating.'),
open('Describe a time you used data to choose between alternatives.', 'Explain the metric, data quality, alternatives, decision and what happened after implementation.'),
open('Tell me about a time you had to work independently.', 'Show how you clarified the expected result, planned milestones, surfaced blockers early and validated your work.'),
open('Describe a time you helped a group reach a difficult agreement.', 'Show how you surfaced shared goals, compared options fairly, recorded the decision and supported execution.'),
open('Tell me about a time you improved something after observing users.', 'Describe the observation, user pain point, change, validation method and measurable improvement.')]);
companyBank.amazon.technical.push(...[open('How do database transactions provide ACID guarantees?', 'Explain atomicity, consistency, isolation and durability, and connect each to a practical example such as transferring money.'),
open('What is the difference between authentication and authorization?', 'Authentication establishes who a user is; authorization decides what that authenticated user may access. Enforce authorization on the server.'),
open('How would you investigate a slow API endpoint?', 'Measure latency by stage, inspect logs and traces, check database query plans and indexes, profile CPU/network calls, reproduce with representative load, then verify the fix.'),
open('Explain process versus thread and their trade-offs.', 'Processes have separate address spaces and stronger isolation; threads share process memory and are lighter but require synchronization to avoid races.'),
open('What is a race condition? Give a way to prevent one.', 'A race occurs when concurrent operations access shared state and outcome depends on timing. Use locks, atomic operations, immutability or safe message passing.'),
open('How does an index speed up a database query, and what does it cost?', 'An index provides a faster lookup structure, often reducing scans; it consumes storage and adds overhead to inserts, updates and deletes.'),
open('Compare SQL and document databases for a new application.', 'Choose based on relationships, transaction needs, query patterns, schema evolution and operational constraints; avoid claiming one is universally better.'),
open('What is caching and how would you prevent stale data?', 'Cache repeated results near consumers; define TTL, invalidation or versioning, and consider cache stampedes and consistency requirements.'),
open('Explain REST resource design and idempotent HTTP methods.', 'Use resource-oriented URLs and HTTP semantics. GET, PUT and DELETE are intended to be idempotent; POST generally is not.'),
open('What is the purpose of a message queue in a distributed system?', 'Queues decouple producers and consumers, smooth bursts and enable retries; design for duplicates, ordering, dead-letter handling and eventual consistency.'),
open('How would you make a file-upload API secure?', 'Validate size and type server-side, generate safe names, store outside executable paths, enforce authorization, scan where appropriate and avoid trusting client MIME types.'),
open('Explain memory leaks and how you would detect them.', 'A leak occurs when unused objects remain reachable. Use heap snapshots, allocation profiling, bounded caches and lifecycle cleanup.'),
open('What is garbage collection?', 'A runtime reclaims memory no longer reachable by the program; explain that pauses and allocation pressure can still affect performance.'),
open('How does DNS work at a high level?', 'A resolver checks caches and queries DNS hierarchy to map a hostname to records such as A/AAAA, then the client connects to the returned address.'),
open('What is load balancing and what algorithms can be used?', 'Distribute requests across healthy instances using round robin, least connections or weighted strategies; consider health checks and session state.'),
open('Explain horizontal and vertical scaling.', 'Vertical scaling increases resources on one machine; horizontal scaling adds machines and requires distribution, coordination and resilience.'),
open('How would you design pagination for a large dataset?', 'Offset pagination is simple but can become slow or unstable; cursor/keyset pagination is better for large ordered datasets and needs a stable sort key.'),
open('What is the difference between unit, integration and end-to-end tests?', 'Unit tests isolate small logic; integration tests verify component boundaries; end-to-end tests exercise complete user workflows.'),
open('How do you handle secrets and environment configuration?', 'Keep secrets out of source control, use managed secret storage or environment injection, rotate credentials and apply least privilege.'),
open('What is eventual consistency?', 'Replicas or services may temporarily disagree but converge; design user flows and retries to tolerate delayed visibility.'),
open('How would you design an application that remains available when one service fails?', 'Use timeouts, bounded retries with backoff, circuit breakers, graceful degradation, health checks and clear failure isolation.')]);
companyBank.amazon.coding.push(...[open('Find the maximum subarray sum in an integer array.', 'Kadane’s algorithm tracks the best sum ending at the current index and the global best. O(n) time, O(1) space.'),
open('Validate whether a binary tree is a binary search tree.', 'Use recursive lower and upper bounds or in-order traversal checking strict increasing order. O(n) time.'),
open('Return the level-order traversal of a binary tree.', 'Use BFS with a queue; process the current queue length per level. O(n) time.'),
open('Find the first non-repeating character in a string.', 'Count frequencies, then scan the string in original order for frequency one. O(n) time.'),
open('Check whether two strings are anagrams.', 'Compare character counts or sort both strings. Frequency counting is O(n) time for a bounded alphabet.'),
open('Find the missing number from values 0 through n.', 'Use arithmetic sum or XOR; validate constraints and avoid integer overflow. O(n) time and O(1) extra space.'),
open('Rotate an array to the right by k positions in-place.', 'Normalize k modulo n and use the three-reversal technique. O(n) time and O(1) extra space.'),
open('Search for a target in a rotated sorted array.', 'Use modified binary search; at least one half is sorted each iteration. O(log n) time.'),
open('Find the kth largest element in an unsorted array.', 'Use a min-heap of size k for O(n log k), or randomized quickselect for expected O(n).'),
open('Group a list of words that are anagrams.', 'Use a canonical key such as sorted characters or a frequency signature and group words in a hash map.'),
open('Find the number of islands in a grid.', 'Scan cells; when an unvisited land cell appears, run DFS/BFS and mark its connected component. O(rows×cols).'),
open('Find the shortest path in an unweighted graph.', 'Run BFS from the source, recording distance and predecessor; reconstruct the path when the destination is reached.'),
open('Implement an LRU cache.', 'Combine a hash map with a doubly linked list to support O(1) lookup, promotion and eviction.'),
open('Find the minimum number of coins for a target amount.', 'Use dynamic programming: dp[a] = min(dp[a], 1+dp[a-coin]); define unreachable states and base dp[0]=0.'),
open('Determine whether a string of brackets is balanced.', 'Use a stack; push opening brackets and verify each closing bracket matches the latest opener. O(n).'),
open('Implement binary search and explain its loop invariant.', 'Maintain a search interval containing any possible target; shrink it each iteration. Requires sorted input; O(log n).'),
open('Find the top k frequent elements in an array.', 'Count with a hash map, then use a heap or bucket sort. Explain expected O(n log k) or O(n).'),
open('Return all unique triplets whose sum is zero.', 'Sort, fix one value and use two pointers while skipping duplicates. O(n²) time.'),
open('Flatten a nested list or array.', 'Use recursion or an explicit stack; define behaviour for depth limits and non-array values.'),
open('Find the longest increasing subsequence length.', 'Use patience sorting with a tails array and binary search for O(n log n), or DP O(n²).'),
open('Design a function to debounce rapid user input.', 'Keep a timer; cancel the previous scheduled call and execute after the quiet interval. Clear timers on component unmount.')]);
companyBank.amazon.hr.push(...[open('What is one area you are actively improving?', 'Choose a genuine, role-relevant development area and explain the concrete routine or feedback loop you use to improve.'),
open('How do you respond when you do not know an answer in an interview?', 'Be honest, clarify assumptions, reason aloud, consider a small example and explain how you would verify the answer.'),
open('Are you comfortable receiving code reviews?', 'Explain that reviews improve quality and shared understanding; describe how you respond constructively and apply recurring feedback.'),
open('How do you manage deadlines during exams or competing commitments?', 'Describe planning, realistic time blocks, early communication and how you protect quality rather than making promises you cannot keep.'),
open('What motivates you to work in software engineering?', 'Give a personal, specific reason supported by a project or experience; avoid generic claims about salary or trends.'),
open('What kind of work environment helps you perform well?', 'Describe practical conditions such as clear goals, respectful feedback and collaboration, while showing adaptability.'),
open('Would you prefer working alone or in a team?', 'Explain that focused individual work and collaboration serve different purposes; give an example of both.'),
open('How do you handle repetitive or routine tasks?', 'Explain how you maintain accuracy, look for safe automation and still verify the result.'),
open('What would you do if you disagreed with your manager?', 'Ask questions, present evidence respectfully, understand constraints and commit professionally once a decision is made.'),
open('How would your classmates or teammates describe you?', 'Choose two or three traits and support each with observable examples rather than unsupported adjectives.'),
open('What is your biggest professional achievement so far?', 'Describe the context, your own contribution, obstacles and a verifiable outcome.'),
open('Tell me about a time you missed a deadline.', 'Take responsibility, explain the cause without excuses, describe communication and recovery, and state what changed afterward.'),
open('How do you keep your technical knowledge current?', 'Mention a sustainable mix of documentation, practice projects, code reading and reflection; provide a recent example.'),
open('What are your salary expectations as a fresher?', 'Research the role and market, express flexibility within the company range, and keep focus on role fit and growth.'),
open('Are you willing to relocate or work in shifts if the role requires it?', 'Answer honestly based on your real constraints; ask about expectations and timelines rather than giving a false commitment.'),
open('When would you be available to join?', 'State your actual academic schedule, notice or exam obligations and a realistic date.'),
open('Do you have any questions for the interviewer?', 'Ask about onboarding, team priorities, success measures, mentoring, engineering practices or the next interview stage.'),
open('How do you define success in your first six months?', 'Focus on learning the product, understanding team standards, delivering a scoped feature and building trust through reliable communication.'),
open('What would you do if assigned a task using a technology you have never used?', 'Clarify expected outcome, learn the essentials from reliable docs, build a small proof of concept, seek review and share progress.'),
open('How do you ensure your work is accurate?', 'Discuss requirements, tests, peer review, edge cases, monitoring and checking the result against expected behaviour.'),
open('Why should we choose you over another fresher?', 'Summarise demonstrated skills, project contribution, learning habits and collaboration; avoid comparing yourself negatively to others.')]);
companyBank.google.behavioural.push(...[open('Describe a time you had to learn from a failure.', 'Own your part, explain the impact, show the correction, and identify the specific habit or safeguard you adopted afterward.'),
open('Tell me about a time you challenged an existing approach.', 'Explain the current approach fairly, the evidence behind your alternative, how you tested it, and how you handled the decision.'),
open('Describe a situation where you had multiple urgent tasks.', 'Explain how you assessed impact and deadlines, agreed priorities, communicated trade-offs, and delivered the highest-value work.'),
open('Tell me about a time you received feedback you initially disagreed with.', 'Describe the feedback, how you checked it objectively, what you changed or clarified, and the result.'),
open('Give an example of how you handled conflict within a team.', 'Focus on listening, separating facts from assumptions, agreeing on a shared goal, and resolving the issue professionally.'),
open('Describe a time you improved quality even though the deadline was close.', 'Explain the risk, the minimum essential quality checks, how you prioritised them, and the defects or rework avoided.'),
open('Tell me about a time you influenced someone without authority.', 'Show how you understood their concern, used evidence or a small prototype, and reached agreement without relying on your position.'),
open('Describe a time you had to communicate a technical issue to a non-technical person.', 'Avoid jargon. Explain the impact, options, recommendation, and next step in terms relevant to the listener.'),
open('Tell me about a time you spotted a risk before it became a problem.', 'Explain the signal you noticed, how you assessed likelihood and impact, the preventive action, and what was avoided.'),
open('Describe a time you worked with someone whose style differed from yours.', 'Explain the difference respectfully, how you adapted communication and working agreements, and how the team delivered.'),
open('Tell me about a time you had to change your plan suddenly.', 'Describe what changed, how you re-evaluated priorities, who you informed, and how you maintained progress.'),
open('Give an example of a goal you set and achieved.', 'Make the goal measurable, describe milestones and obstacles, and provide evidence of the outcome.'),
open('Describe a time you made a process more reliable.', 'Identify failure points, explain the checks or automation you added, and compare reliability before and after.'),
open('Tell me about a time you had to defend a user-focused decision.', 'Connect the decision to a real user need, evidence you gathered, trade-offs considered, and the impact.'),
open('Describe a time you had to collaborate across different roles.', 'Explain each role’s needs, how you aligned expectations and dependencies, and the shared result.'),
open('Tell me about a time you had to deliver difficult news.', 'Be direct and timely, explain facts and impact, take responsibility where appropriate, and offer a recovery plan.'),
open('Give an example of when you went beyond the minimum requirement.', 'Choose a relevant example, explain why the extra work mattered, and quantify the benefit without exaggerating.'),
open('Describe a time you used data to choose between alternatives.', 'Explain the metric, data quality, alternatives, decision and what happened after implementation.'),
open('Tell me about a time you had to work independently.', 'Show how you clarified the expected result, planned milestones, surfaced blockers early and validated your work.'),
open('Describe a time you helped a group reach a difficult agreement.', 'Show how you surfaced shared goals, compared options fairly, recorded the decision and supported execution.'),
open('Tell me about a time you improved something after observing users.', 'Describe the observation, user pain point, change, validation method and measurable improvement.')]);
companyBank.google.technical.push(...[open('How do database transactions provide ACID guarantees?', 'Explain atomicity, consistency, isolation and durability, and connect each to a practical example such as transferring money.'),
open('What is the difference between authentication and authorization?', 'Authentication establishes who a user is; authorization decides what that authenticated user may access. Enforce authorization on the server.'),
open('How would you investigate a slow API endpoint?', 'Measure latency by stage, inspect logs and traces, check database query plans and indexes, profile CPU/network calls, reproduce with representative load, then verify the fix.'),
open('Explain process versus thread and their trade-offs.', 'Processes have separate address spaces and stronger isolation; threads share process memory and are lighter but require synchronization to avoid races.'),
open('What is a race condition? Give a way to prevent one.', 'A race occurs when concurrent operations access shared state and outcome depends on timing. Use locks, atomic operations, immutability or safe message passing.'),
open('How does an index speed up a database query, and what does it cost?', 'An index provides a faster lookup structure, often reducing scans; it consumes storage and adds overhead to inserts, updates and deletes.'),
open('Compare SQL and document databases for a new application.', 'Choose based on relationships, transaction needs, query patterns, schema evolution and operational constraints; avoid claiming one is universally better.'),
open('What is caching and how would you prevent stale data?', 'Cache repeated results near consumers; define TTL, invalidation or versioning, and consider cache stampedes and consistency requirements.'),
open('Explain REST resource design and idempotent HTTP methods.', 'Use resource-oriented URLs and HTTP semantics. GET, PUT and DELETE are intended to be idempotent; POST generally is not.'),
open('What is the purpose of a message queue in a distributed system?', 'Queues decouple producers and consumers, smooth bursts and enable retries; design for duplicates, ordering, dead-letter handling and eventual consistency.'),
open('How would you make a file-upload API secure?', 'Validate size and type server-side, generate safe names, store outside executable paths, enforce authorization, scan where appropriate and avoid trusting client MIME types.'),
open('Explain memory leaks and how you would detect them.', 'A leak occurs when unused objects remain reachable. Use heap snapshots, allocation profiling, bounded caches and lifecycle cleanup.'),
open('What is garbage collection?', 'A runtime reclaims memory no longer reachable by the program; explain that pauses and allocation pressure can still affect performance.'),
open('How does DNS work at a high level?', 'A resolver checks caches and queries DNS hierarchy to map a hostname to records such as A/AAAA, then the client connects to the returned address.'),
open('What is load balancing and what algorithms can be used?', 'Distribute requests across healthy instances using round robin, least connections or weighted strategies; consider health checks and session state.'),
open('Explain horizontal and vertical scaling.', 'Vertical scaling increases resources on one machine; horizontal scaling adds machines and requires distribution, coordination and resilience.'),
open('How would you design pagination for a large dataset?', 'Offset pagination is simple but can become slow or unstable; cursor/keyset pagination is better for large ordered datasets and needs a stable sort key.'),
open('What is the difference between unit, integration and end-to-end tests?', 'Unit tests isolate small logic; integration tests verify component boundaries; end-to-end tests exercise complete user workflows.'),
open('How do you handle secrets and environment configuration?', 'Keep secrets out of source control, use managed secret storage or environment injection, rotate credentials and apply least privilege.'),
open('What is eventual consistency?', 'Replicas or services may temporarily disagree but converge; design user flows and retries to tolerate delayed visibility.'),
open('How would you design an application that remains available when one service fails?', 'Use timeouts, bounded retries with backoff, circuit breakers, graceful degradation, health checks and clear failure isolation.')]);
companyBank.google.coding.push(...[open('Find the maximum subarray sum in an integer array.', 'Kadane’s algorithm tracks the best sum ending at the current index and the global best. O(n) time, O(1) space.'),
open('Validate whether a binary tree is a binary search tree.', 'Use recursive lower and upper bounds or in-order traversal checking strict increasing order. O(n) time.'),
open('Return the level-order traversal of a binary tree.', 'Use BFS with a queue; process the current queue length per level. O(n) time.'),
open('Find the first non-repeating character in a string.', 'Count frequencies, then scan the string in original order for frequency one. O(n) time.'),
open('Check whether two strings are anagrams.', 'Compare character counts or sort both strings. Frequency counting is O(n) time for a bounded alphabet.'),
open('Find the missing number from values 0 through n.', 'Use arithmetic sum or XOR; validate constraints and avoid integer overflow. O(n) time and O(1) extra space.'),
open('Rotate an array to the right by k positions in-place.', 'Normalize k modulo n and use the three-reversal technique. O(n) time and O(1) extra space.'),
open('Search for a target in a rotated sorted array.', 'Use modified binary search; at least one half is sorted each iteration. O(log n) time.'),
open('Find the kth largest element in an unsorted array.', 'Use a min-heap of size k for O(n log k), or randomized quickselect for expected O(n).'),
open('Group a list of words that are anagrams.', 'Use a canonical key such as sorted characters or a frequency signature and group words in a hash map.'),
open('Find the number of islands in a grid.', 'Scan cells; when an unvisited land cell appears, run DFS/BFS and mark its connected component. O(rows×cols).'),
open('Find the shortest path in an unweighted graph.', 'Run BFS from the source, recording distance and predecessor; reconstruct the path when the destination is reached.'),
open('Implement an LRU cache.', 'Combine a hash map with a doubly linked list to support O(1) lookup, promotion and eviction.'),
open('Find the minimum number of coins for a target amount.', 'Use dynamic programming: dp[a] = min(dp[a], 1+dp[a-coin]); define unreachable states and base dp[0]=0.'),
open('Determine whether a string of brackets is balanced.', 'Use a stack; push opening brackets and verify each closing bracket matches the latest opener. O(n).'),
open('Implement binary search and explain its loop invariant.', 'Maintain a search interval containing any possible target; shrink it each iteration. Requires sorted input; O(log n).'),
open('Find the top k frequent elements in an array.', 'Count with a hash map, then use a heap or bucket sort. Explain expected O(n log k) or O(n).'),
open('Return all unique triplets whose sum is zero.', 'Sort, fix one value and use two pointers while skipping duplicates. O(n²) time.'),
open('Flatten a nested list or array.', 'Use recursion or an explicit stack; define behaviour for depth limits and non-array values.'),
open('Find the longest increasing subsequence length.', 'Use patience sorting with a tails array and binary search for O(n log n), or DP O(n²).'),
open('Design a function to debounce rapid user input.', 'Keep a timer; cancel the previous scheduled call and execute after the quiet interval. Clear timers on component unmount.')]);
companyBank.google.hr.push(...[open('What is one area you are actively improving?', 'Choose a genuine, role-relevant development area and explain the concrete routine or feedback loop you use to improve.'),
open('How do you respond when you do not know an answer in an interview?', 'Be honest, clarify assumptions, reason aloud, consider a small example and explain how you would verify the answer.'),
open('Are you comfortable receiving code reviews?', 'Explain that reviews improve quality and shared understanding; describe how you respond constructively and apply recurring feedback.'),
open('How do you manage deadlines during exams or competing commitments?', 'Describe planning, realistic time blocks, early communication and how you protect quality rather than making promises you cannot keep.'),
open('What motivates you to work in software engineering?', 'Give a personal, specific reason supported by a project or experience; avoid generic claims about salary or trends.'),
open('What kind of work environment helps you perform well?', 'Describe practical conditions such as clear goals, respectful feedback and collaboration, while showing adaptability.'),
open('Would you prefer working alone or in a team?', 'Explain that focused individual work and collaboration serve different purposes; give an example of both.'),
open('How do you handle repetitive or routine tasks?', 'Explain how you maintain accuracy, look for safe automation and still verify the result.'),
open('What would you do if you disagreed with your manager?', 'Ask questions, present evidence respectfully, understand constraints and commit professionally once a decision is made.'),
open('How would your classmates or teammates describe you?', 'Choose two or three traits and support each with observable examples rather than unsupported adjectives.'),
open('What is your biggest professional achievement so far?', 'Describe the context, your own contribution, obstacles and a verifiable outcome.'),
open('Tell me about a time you missed a deadline.', 'Take responsibility, explain the cause without excuses, describe communication and recovery, and state what changed afterward.'),
open('How do you keep your technical knowledge current?', 'Mention a sustainable mix of documentation, practice projects, code reading and reflection; provide a recent example.'),
open('What are your salary expectations as a fresher?', 'Research the role and market, express flexibility within the company range, and keep focus on role fit and growth.'),
open('Are you willing to relocate or work in shifts if the role requires it?', 'Answer honestly based on your real constraints; ask about expectations and timelines rather than giving a false commitment.'),
open('When would you be available to join?', 'State your actual academic schedule, notice or exam obligations and a realistic date.'),
open('Do you have any questions for the interviewer?', 'Ask about onboarding, team priorities, success measures, mentoring, engineering practices or the next interview stage.'),
open('How do you define success in your first six months?', 'Focus on learning the product, understanding team standards, delivering a scoped feature and building trust through reliable communication.'),
open('What would you do if assigned a task using a technology you have never used?', 'Clarify expected outcome, learn the essentials from reliable docs, build a small proof of concept, seek review and share progress.'),
open('How do you ensure your work is accurate?', 'Discuss requirements, tests, peer review, edge cases, monitoring and checking the result against expected behaviour.'),
open('Why should we choose you over another fresher?', 'Summarise demonstrated skills, project contribution, learning habits and collaboration; avoid comparing yourself negatively to others.')]);
companyBank.zoho = { name: 'Zoho', mark: 'Z', behavioural: [open('Tell me about a time you took responsibility when a project was falling behind.', 'Use STAR. Explain the early warning you noticed, the recovery plan you owned, how you communicated risks, and the measurable delivery result.'),
open('Describe a time you had to make a decision with incomplete information.', 'State what was unknown, which facts you gathered, the assumptions and risks, why you chose the path, and how you monitored the outcome.'),
open('Tell me about a time you simplified a complicated process.', 'Describe the original friction, how you found its root cause, the change you introduced, and evidence that it saved time or reduced errors.'),
open('Give an example of a time you helped a teammate who was struggling.', 'Explain how you understood the blocker, supported without taking over, shared knowledge, and helped the teammate become independent.'),
open('Describe a time you had to learn from a failure.', 'Own your part, explain the impact, show the correction, and identify the specific habit or safeguard you adopted afterward.'),
open('Tell me about a time you challenged an existing approach.', 'Explain the current approach fairly, the evidence behind your alternative, how you tested it, and how you handled the decision.'),
open('Describe a situation where you had multiple urgent tasks.', 'Explain how you assessed impact and deadlines, agreed priorities, communicated trade-offs, and delivered the highest-value work.'),
open('Tell me about a time you received feedback you initially disagreed with.', 'Describe the feedback, how you checked it objectively, what you changed or clarified, and the result.'),
open('Give an example of how you handled conflict within a team.', 'Focus on listening, separating facts from assumptions, agreeing on a shared goal, and resolving the issue professionally.'),
open('Describe a time you improved quality even though the deadline was close.', 'Explain the risk, the minimum essential quality checks, how you prioritised them, and the defects or rework avoided.'),
open('Tell me about a time you influenced someone without authority.', 'Show how you understood their concern, used evidence or a small prototype, and reached agreement without relying on your position.'),
open('Describe a time you had to communicate a technical issue to a non-technical person.', 'Avoid jargon. Explain the impact, options, recommendation, and next step in terms relevant to the listener.'),
open('Tell me about a time you spotted a risk before it became a problem.', 'Explain the signal you noticed, how you assessed likelihood and impact, the preventive action, and what was avoided.'),
open('Describe a time you worked with someone whose style differed from yours.', 'Explain the difference respectfully, how you adapted communication and working agreements, and how the team delivered.'),
open('Tell me about a time you had to change your plan suddenly.', 'Describe what changed, how you re-evaluated priorities, who you informed, and how you maintained progress.'),
open('Give an example of a goal you set and achieved.', 'Make the goal measurable, describe milestones and obstacles, and provide evidence of the outcome.'),
open('Describe a time you made a process more reliable.', 'Identify failure points, explain the checks or automation you added, and compare reliability before and after.'),
open('Tell me about a time you had to defend a user-focused decision.', 'Connect the decision to a real user need, evidence you gathered, trade-offs considered, and the impact.'),
open('Describe a time you had to collaborate across different roles.', 'Explain each role’s needs, how you aligned expectations and dependencies, and the shared result.'),
open('Tell me about a time you had to deliver difficult news.', 'Be direct and timely, explain facts and impact, take responsibility where appropriate, and offer a recovery plan.'),
open('Give an example of when you went beyond the minimum requirement.', 'Choose a relevant example, explain why the extra work mattered, and quantify the benefit without exaggerating.'),
open('Describe a time you used data to choose between alternatives.', 'Explain the metric, data quality, alternatives, decision and what happened after implementation.'),
open('Tell me about a time you had to work independently.', 'Show how you clarified the expected result, planned milestones, surfaced blockers early and validated your work.'),
open('Describe a time you helped a group reach a difficult agreement.', 'Show how you surfaced shared goals, compared options fairly, recorded the decision and supported execution.'),
open('Tell me about a time you improved something after observing users.', 'Describe the observation, user pain point, change, validation method and measurable improvement.')], technical: [open('Explain the difference between an array and a linked list, including when you would choose each.', 'Arrays provide O(1) indexed access and good cache locality; inserting in the middle is typically O(n). Linked lists support O(1) insertion when the node is known but indexed access is O(n). Choose based on access and update patterns.'),
open('How would you design a rate limiter for a public API?', 'Define limits per user or API key, then consider token bucket or sliding window, shared storage for multiple servers, clock consistency, burst behaviour and clear 429 responses.'),
open('What happens when a browser sends an HTTPS request to a server?', 'Describe DNS, TCP connection (or QUIC for HTTP/3), TLS negotiation and certificate validation, HTTP request handling, response and browser rendering at a high level.'),
open('Explain database normalization and when denormalization may be useful.', 'Normalization reduces duplication and update anomalies. Denormalization can improve read performance for measured workloads, but requires consistency strategy.'),
open('How do database transactions provide ACID guarantees?', 'Explain atomicity, consistency, isolation and durability, and connect each to a practical example such as transferring money.'),
open('What is the difference between authentication and authorization?', 'Authentication establishes who a user is; authorization decides what that authenticated user may access. Enforce authorization on the server.'),
open('How would you investigate a slow API endpoint?', 'Measure latency by stage, inspect logs and traces, check database query plans and indexes, profile CPU/network calls, reproduce with representative load, then verify the fix.'),
open('Explain process versus thread and their trade-offs.', 'Processes have separate address spaces and stronger isolation; threads share process memory and are lighter but require synchronization to avoid races.'),
open('What is a race condition? Give a way to prevent one.', 'A race occurs when concurrent operations access shared state and outcome depends on timing. Use locks, atomic operations, immutability or safe message passing.'),
open('How does an index speed up a database query, and what does it cost?', 'An index provides a faster lookup structure, often reducing scans; it consumes storage and adds overhead to inserts, updates and deletes.'),
open('Compare SQL and document databases for a new application.', 'Choose based on relationships, transaction needs, query patterns, schema evolution and operational constraints; avoid claiming one is universally better.'),
open('What is caching and how would you prevent stale data?', 'Cache repeated results near consumers; define TTL, invalidation or versioning, and consider cache stampedes and consistency requirements.'),
open('Explain REST resource design and idempotent HTTP methods.', 'Use resource-oriented URLs and HTTP semantics. GET, PUT and DELETE are intended to be idempotent; POST generally is not.'),
open('What is the purpose of a message queue in a distributed system?', 'Queues decouple producers and consumers, smooth bursts and enable retries; design for duplicates, ordering, dead-letter handling and eventual consistency.'),
open('How would you make a file-upload API secure?', 'Validate size and type server-side, generate safe names, store outside executable paths, enforce authorization, scan where appropriate and avoid trusting client MIME types.'),
open('Explain memory leaks and how you would detect them.', 'A leak occurs when unused objects remain reachable. Use heap snapshots, allocation profiling, bounded caches and lifecycle cleanup.'),
open('What is garbage collection?', 'A runtime reclaims memory no longer reachable by the program; explain that pauses and allocation pressure can still affect performance.'),
open('How does DNS work at a high level?', 'A resolver checks caches and queries DNS hierarchy to map a hostname to records such as A/AAAA, then the client connects to the returned address.'),
open('What is load balancing and what algorithms can be used?', 'Distribute requests across healthy instances using round robin, least connections or weighted strategies; consider health checks and session state.'),
open('Explain horizontal and vertical scaling.', 'Vertical scaling increases resources on one machine; horizontal scaling adds machines and requires distribution, coordination and resilience.'),
open('How would you design pagination for a large dataset?', 'Offset pagination is simple but can become slow or unstable; cursor/keyset pagination is better for large ordered datasets and needs a stable sort key.'),
open('What is the difference between unit, integration and end-to-end tests?', 'Unit tests isolate small logic; integration tests verify component boundaries; end-to-end tests exercise complete user workflows.'),
open('How do you handle secrets and environment configuration?', 'Keep secrets out of source control, use managed secret storage or environment injection, rotate credentials and apply least privilege.'),
open('What is eventual consistency?', 'Replicas or services may temporarily disagree but converge; design user flows and retries to tolerate delayed visibility.'),
open('How would you design an application that remains available when one service fails?', 'Use timeouts, bounded retries with backoff, circuit breakers, graceful degradation, health checks and clear failure isolation.')], coding: [open('Given an integer array, return the indices of two values that sum to a target. Explain your complexity.', 'Use a hash map of previously seen values. For each value x, look for target-x, otherwise store x and its index. Expected O(n) time and O(n) space.'),
open('Find the longest substring without repeating characters.', 'Use a sliding window and a map of last-seen positions. Move the left boundary past duplicates. O(n) time.'),
open('Merge two sorted linked lists into one sorted list.', 'Use a dummy head and two pointers, attach the smaller node each step, then append the remainder. O(n+m) time.'),
open('Detect whether a linked list contains a cycle.', 'Use Floyd’s slow and fast pointers. If they meet, a cycle exists; O(n) time and O(1) extra space.'),
open('Find the maximum subarray sum in an integer array.', 'Kadane’s algorithm tracks the best sum ending at the current index and the global best. O(n) time, O(1) space.'),
open('Validate whether a binary tree is a binary search tree.', 'Use recursive lower and upper bounds or in-order traversal checking strict increasing order. O(n) time.'),
open('Return the level-order traversal of a binary tree.', 'Use BFS with a queue; process the current queue length per level. O(n) time.'),
open('Find the first non-repeating character in a string.', 'Count frequencies, then scan the string in original order for frequency one. O(n) time.'),
open('Check whether two strings are anagrams.', 'Compare character counts or sort both strings. Frequency counting is O(n) time for a bounded alphabet.'),
open('Find the missing number from values 0 through n.', 'Use arithmetic sum or XOR; validate constraints and avoid integer overflow. O(n) time and O(1) extra space.'),
open('Rotate an array to the right by k positions in-place.', 'Normalize k modulo n and use the three-reversal technique. O(n) time and O(1) extra space.'),
open('Search for a target in a rotated sorted array.', 'Use modified binary search; at least one half is sorted each iteration. O(log n) time.'),
open('Find the kth largest element in an unsorted array.', 'Use a min-heap of size k for O(n log k), or randomized quickselect for expected O(n).'),
open('Group a list of words that are anagrams.', 'Use a canonical key such as sorted characters or a frequency signature and group words in a hash map.'),
open('Find the number of islands in a grid.', 'Scan cells; when an unvisited land cell appears, run DFS/BFS and mark its connected component. O(rows×cols).'),
open('Find the shortest path in an unweighted graph.', 'Run BFS from the source, recording distance and predecessor; reconstruct the path when the destination is reached.'),
open('Implement an LRU cache.', 'Combine a hash map with a doubly linked list to support O(1) lookup, promotion and eviction.'),
open('Find the minimum number of coins for a target amount.', 'Use dynamic programming: dp[a] = min(dp[a], 1+dp[a-coin]); define unreachable states and base dp[0]=0.'),
open('Determine whether a string of brackets is balanced.', 'Use a stack; push opening brackets and verify each closing bracket matches the latest opener. O(n).'),
open('Implement binary search and explain its loop invariant.', 'Maintain a search interval containing any possible target; shrink it each iteration. Requires sorted input; O(log n).'),
open('Find the top k frequent elements in an array.', 'Count with a hash map, then use a heap or bucket sort. Explain expected O(n log k) or O(n).'),
open('Return all unique triplets whose sum is zero.', 'Sort, fix one value and use two pointers while skipping duplicates. O(n²) time.'),
open('Flatten a nested list or array.', 'Use recursion or an explicit stack; define behaviour for depth limits and non-array values.'),
open('Find the longest increasing subsequence length.', 'Use patience sorting with a tails array and binary search for O(n log n), or DP O(n²).'),
open('Design a function to debounce rapid user input.', 'Keep a timer; cancel the previous scheduled call and execute after the quiet interval. Clear timers on component unmount.')], hr: [open('Walk me through your resume.', 'Give a concise chronological overview focused on education, relevant skills, projects, internships or activities, and the role you are targeting.'),
open('Why are you interested in this company and role?', 'Connect a specific product, engineering challenge or company value to your own interests and evidence from your preparation.'),
open('What do you know about the team or product?', 'Mention researched facts accurately, identify the users or problem it serves, and ask a thoughtful question if details are unclear.'),
open('What are your short-term career goals?', 'Describe realistic first-year goals such as learning the codebase, delivering reliable work, improving fundamentals and seeking feedback.'),
open('What is one area you are actively improving?', 'Choose a genuine, role-relevant development area and explain the concrete routine or feedback loop you use to improve.'),
open('How do you respond when you do not know an answer in an interview?', 'Be honest, clarify assumptions, reason aloud, consider a small example and explain how you would verify the answer.'),
open('Are you comfortable receiving code reviews?', 'Explain that reviews improve quality and shared understanding; describe how you respond constructively and apply recurring feedback.'),
open('How do you manage deadlines during exams or competing commitments?', 'Describe planning, realistic time blocks, early communication and how you protect quality rather than making promises you cannot keep.'),
open('What motivates you to work in software engineering?', 'Give a personal, specific reason supported by a project or experience; avoid generic claims about salary or trends.'),
open('What kind of work environment helps you perform well?', 'Describe practical conditions such as clear goals, respectful feedback and collaboration, while showing adaptability.'),
open('Would you prefer working alone or in a team?', 'Explain that focused individual work and collaboration serve different purposes; give an example of both.'),
open('How do you handle repetitive or routine tasks?', 'Explain how you maintain accuracy, look for safe automation and still verify the result.'),
open('What would you do if you disagreed with your manager?', 'Ask questions, present evidence respectfully, understand constraints and commit professionally once a decision is made.'),
open('How would your classmates or teammates describe you?', 'Choose two or three traits and support each with observable examples rather than unsupported adjectives.'),
open('What is your biggest professional achievement so far?', 'Describe the context, your own contribution, obstacles and a verifiable outcome.'),
open('Tell me about a time you missed a deadline.', 'Take responsibility, explain the cause without excuses, describe communication and recovery, and state what changed afterward.'),
open('How do you keep your technical knowledge current?', 'Mention a sustainable mix of documentation, practice projects, code reading and reflection; provide a recent example.'),
open('What are your salary expectations as a fresher?', 'Research the role and market, express flexibility within the company range, and keep focus on role fit and growth.'),
open('Are you willing to relocate or work in shifts if the role requires it?', 'Answer honestly based on your real constraints; ask about expectations and timelines rather than giving a false commitment.'),
open('When would you be available to join?', 'State your actual academic schedule, notice or exam obligations and a realistic date.'),
open('Do you have any questions for the interviewer?', 'Ask about onboarding, team priorities, success measures, mentoring, engineering practices or the next interview stage.'),
open('How do you define success in your first six months?', 'Focus on learning the product, understanding team standards, delivering a scoped feature and building trust through reliable communication.'),
open('What would you do if assigned a task using a technology you have never used?', 'Clarify expected outcome, learn the essentials from reliable docs, build a small proof of concept, seek review and share progress.'),
open('How do you ensure your work is accurate?', 'Discuss requirements, tests, peer review, edge cases, monitoring and checking the result against expected behaviour.'),
open('Why should we choose you over another fresher?', 'Summarise demonstrated skills, project contribution, learning habits and collaboration; avoid comparing yourself negatively to others.')] };



// Zoho-specific MCQs focus on business applications, data integrity and customer workflows.
companyBank.zoho.technical.splice(21, 4,
  q('A business application must keep an audit trail of changes to an invoice. Which design is most suitable?', ['Overwrite the invoice and discard history', 'Store timestamped change records with actor and changed fields', 'Keep the history only in browser memory', 'Use a random filename as the audit record'], 1, 'An audit log should be durable and record who changed what and when. It should be protected from ordinary edits.', 'A timestamped, append-oriented audit record supports traceability and investigation.'),
  q('A CRM search must find customers by email quickly. Which database feature is most useful?', ['An index on the email field', 'A larger button on the page', 'A CSS class', 'A browser alert'], 0, 'A database index on the searched email field reduces the need to scan every customer record.', 'Index fields that appear frequently in selective search conditions.'),
  q('Two employees update the same customer record at nearly the same time. What helps prevent lost updates?', ['Disable all database constraints', 'Use optimistic concurrency with a version field', 'Store the record in localStorage only', 'Remove update timestamps'], 1, 'A version field lets the application detect whether another update happened after the record was read.', 'Optimistic concurrency detects stale writes before overwriting newer data.'),
  q('A multi-tenant SaaS application stores records for different organisations. What is essential in each data query?', ['Filter only by the record title', 'Include the authenticated tenant or organisation scope', 'Trust the tenant ID sent by any browser', 'Return all records and hide some with CSS'], 1, 'Every server-side query must enforce the authenticated tenant scope so one organisation cannot access another organisation’s data.', 'Tenant isolation must be enforced by the server, not only by the interface.')
);
companyBank.zoho.coding.splice(21, 4,
  q('A list of invoice amounts is given. Which approach calculates the total in one pass?', ['Sort the amounts first', 'Accumulate each amount in a running total', 'Compare only the first and last values', 'Use nested loops for every pair'], 1, 'A single traversal adds each amount to a running total, taking O(n) time and O(1) extra space.', 'A running sum is sufficient when only the total is required.'),
  q('A user-entered email must be checked before saving a customer record. Which validation is most appropriate?', ['Check only that the string is non-empty', 'Validate the format on the server and handle uniqueness in the database', 'Trust the HTML input type alone', 'Convert every email to a number'], 1, 'Client-side checks improve usability, but the server must validate input and the database should enforce uniqueness.', 'Validation and uniqueness checks belong on the trusted server/database side.'),
  q('An API receives a page number and page size. Which calculation determines the database offset for page-based pagination?', ['page + pageSize', 'page * pageSize', '(page - 1) * pageSize', 'pageSize - 1'], 2, 'For one-based page numbering, the offset is (page - 1) multiplied by pageSize.', 'Page 1 starts at offset 0; page 2 starts after one page of records.'),
  q('A background job may be delivered more than once. How should a payment-related operation avoid duplicate effects?', ['Assume jobs run exactly once', 'Use an idempotency key and record processed operations', 'Retry forever without checking state', 'Generate a new customer for every retry'], 1, 'An idempotency key lets the service recognise a repeated request and avoid applying the same business operation twice.', 'Retries are safer when the operation is designed to be idempotent.')
);

// Every MCQ must provide a useful explanation; open-ended prompts use their model answer instead.
for (const company of Object.values(companyBank)) {
  for (const category of ['behavioural', 'technical', 'coding', 'hr']) {
    for (const item of company[category]) {
      if (!item.open && !String(item.explanation || '').trim()) {
        item.explanation = item.answer || `The correct choice is ${item.options?.[item.correct] || 'the selected option'}. Review the concept described in the answer.`;
      }
    }
  }
}


// Identical cross-company prompts are explicitly labelled as shared core interview practice.
const seenQuestionBodies = new Set();
for (const companyId of ['amazon', 'google', 'zoho']) {
  for (const category of ['behavioural', 'technical', 'coding', 'hr']) {
    for (const item of companyBank[companyId][category]) {
      const normalized = item.question.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (seenQuestionBodies.has(normalized)) item.sharedCore = true;
      else seenQuestionBodies.add(normalized);
    }
  }
}

// Additional company banks. These are original practice questions aligned with
// publicly described role expectations and common campus-hiring formats; they
// are not represented as verified or guaranteed past interview questions.
const addCompany = (id, meta) => {
  companyBank[id] = {
    name: meta.name,
    mark: meta.mark,
    type: meta.type,
    focus: meta.focus,
    sourceNote: 'Original PlacePoint practice material informed by common fresher interview formats and public role expectations. Actual rounds vary by role, campus, location and hiring year.',
    behavioural: meta.behavioural.map(([question, answer]) => open(question, answer)),
    technical: meta.technical.map(([question, options, correct, answer, explanation]) => q(question, options, correct, answer, explanation)),
    coding: meta.coding.map(([question, answer]) => open(question, answer)),
    hr: meta.hr.map(([question, answer]) => open(question, answer))
  };
};

const sharedBehavioural = (company) => [
  ['Tell me about a time you learned a new tool or technology to complete a task.', `Explain the goal, how you selected reliable learning resources, the small experiment you built, and how you applied the learning. Connect it to the ${company} role without exaggerating your experience.`],
  ['Describe a time requirements changed after you had started working.', 'Clarify what changed, who needed to know, how you assessed the impact, what you reprioritised, and how you confirmed the revised outcome.'],
  ['Tell me about a difficult bug or quality issue you investigated.', 'Describe how you reproduced it, narrowed down the cause, tested the fix, checked for regressions, and communicated the result.'],
  ['Give an example of working with a teammate whose approach differed from yours.', 'Show that you listened, compared approaches against evidence and requirements, agreed on a decision, and supported the team outcome.'],
  ['Describe a time you had to manage multiple deadlines.', 'Explain how you ranked work by impact and urgency, broke it into milestones, communicated risks early, and delivered responsibly.'],
  ['Tell me about a time you received feedback that helped you improve.', 'State the feedback, your initial response, the specific change you made, and the evidence that your work improved.'],
  ['How have you explained a technical issue to someone without a technical background?', 'Describe the audience, the practical impact, the simple language or visual you used, and how you checked that the person understood.'],
  ['Tell me about a time you took responsibility for a mistake.', 'Own the mistake, explain its impact honestly, describe the correction and the preventive step you introduced.'],
  ['Describe a situation where you had to work with incomplete information.', 'Explain the assumptions you identified, the questions you asked, how you validated facts, and how you kept stakeholders informed.'],
  ['Give an example of helping a team member succeed.', 'Describe what the teammate needed, the support you provided, and how the team benefited. Avoid presenting someone else’s work as your own.'],
  ['Tell me about a time you improved a process or made work more efficient.', 'Identify the original friction, the improvement you proposed, how you tested it, and a measurable or observable result.'],
  ['Describe how you maintained quality while working under time pressure.', 'Explain how you identified essential acceptance criteria, used checks or tests, communicated trade-offs, and avoided hiding defects.']
];
const sharedCoding = [
  ['Given an array and a target, return the indices of two values that add to the target.', 'Use a hash map from value to index. For each element x, check whether target - x has already been seen; otherwise store x. Expected O(n) time and O(n) space. Clarify whether one or multiple solutions are possible.'],
  ['Find the first non-repeating character in a string.', 'Count character frequencies in one pass, then scan the string in original order for a character with count one. O(n) time; define how spaces and case are handled.'],
  ['Check whether a string is a palindrome after ignoring spaces and punctuation.', 'Use two pointers from both ends, skip non-alphanumeric characters, compare normalized characters, and move inward. O(n) time and O(1) extra space.'],
  ['Find the maximum sum of a contiguous subarray.', 'Use Kadane’s algorithm: bestEndingHere = max(value, bestEndingHere + value), while tracking the global maximum. O(n) time and O(1) space. Discuss all-negative input.'],
  ['Merge two sorted arrays into one sorted array.', 'Use two pointers, append the smaller current value, then append the remaining tail. O(n+m) time. If in-place merging is required, clarify buffer capacity.'],
  ['Determine whether a linked list contains a cycle.', 'Use Floyd’s tortoise-and-hare algorithm. Advance slow by one and fast by two; if they meet, a cycle exists. O(n) time and O(1) extra space.'],
  ['Find the missing number from the range 0 through n.', 'Use the arithmetic sum n(n+1)/2 minus the array sum, or XOR. Consider integer overflow and validate the input constraints. O(n) time and O(1) extra space.'],
  ['Validate balanced brackets in an expression.', 'Push opening brackets onto a stack. For each closing bracket, check and pop the matching opener. The expression is valid only if no mismatch occurs and the stack ends empty. O(n).'],
  ['Find the second-largest distinct value in an array.', 'Track largest and secondLargest in one pass, ignoring duplicates. Define behaviour for arrays with fewer than two distinct values. O(n) time and O(1) space.'],
  ['Count the frequency of each word in a sentence.', 'Normalize tokens according to the stated case and punctuation rules, then use a hash map to count occurrences. O(n) expected time in the number of characters.'],
  ['Search for a value in a sorted array efficiently.', 'Use binary search with low and high bounds. Compare the middle element and discard half the interval each iteration. O(log n); the input must be sorted.'],
  ['Find the longest substring without repeating characters.', 'Maintain a sliding window and a map of last-seen character positions. Move the left boundary past a repeated character and update the maximum window length. O(n) expected time.']
];
const sharedHr = (company, role) => [
  ['Tell me about yourself.', `Give a focused 60–90 second introduction: your degree and year, relevant skills, one project and your personal contribution, and why you are interested in a ${role} opportunity at ${company}.`],
  [`Why are you interested in ${company}?`, `Refer to a specific service, product area, engineering domain or business problem that genuinely interests you. Connect it to your skills and learning goals; avoid unsupported claims about the company.`],
  ['Why should we consider you for this fresher role?', 'Support your answer with evidence: fundamentals you have practised, a project contribution, how you learn, and how you collaborate. Be clear about areas you are still developing.'],
  ['What is one technical area you are currently improving?', 'Name a real area, explain why it matters for the role, and describe your current practice routine and how you measure progress.'],
  ['Describe a project on your resume.', 'Explain the user problem, architecture at a high level, your individual contribution, one technical challenge, how you tested it, and what you would improve next.'],
  ['How would you respond if you were assigned work using an unfamiliar technology?', 'Clarify the expected outcome, consult official documentation, build a small proof of concept, ask focused questions, and share progress before deadlines become risky.'],
  ['Are you comfortable working with a team or client-facing stakeholders?', 'Answer honestly and give an example of listening, communicating progress and handling feedback. Ask about the actual role’s collaboration expectations if needed.'],
  ['How do you handle a question when you do not know the answer?', 'Be honest, clarify assumptions, reason from fundamentals, work through a small example, and explain how you would verify the answer. Do not bluff.'],
  ['What are your short-term career goals?', 'Describe a realistic first one or two years: strengthen fundamentals, understand the product or client context, deliver reliable work, and learn from code reviews and mentors.'],
  ['How do you prioritise learning alongside college responsibilities?', 'Describe a sustainable schedule, small measurable goals, revision and practice. Show that you communicate early when deadlines conflict.'],
  ['Are you open to relocation, training or shift requirements?', 'Give an honest answer based on your actual constraints. Clarify location, duration, schedule and support rather than making a promise you cannot keep.'],
  ['What questions would you ask the interviewer?', 'Ask about the team’s current work, training and onboarding, expectations for a fresher in the first six months, feedback practices, and the next selection stage.']
];

addCompany('capgemini', {
  name: 'Capgemini', mark: 'C', type: 'IT services & consulting',
  focus: 'Technology consulting, application engineering, cloud, data and client delivery.',
  behavioural: sharedBehavioural('Capgemini'),
  technical: [
    ['Which phase normally follows requirements analysis in a sequential SDLC model?', ['Design', 'Deployment', 'Maintenance', 'Retirement'], 0, 'In a traditional sequential lifecycle, design follows requirements analysis before implementation.', 'Real projects may use iterative or Agile lifecycles rather than a strict sequence.'],
    ['In Agile, what is the main purpose of a sprint review?', ['Evaluate the increment with stakeholders', 'Assign annual salaries', 'Replace all testing', 'Freeze the product permanently'], 0, 'A sprint review inspects the increment and gathers stakeholder feedback to inform future work.', 'A retrospective is the separate event focused on improving the team process.'],
    ['Which HTTP status code indicates that a request succeeded and a resource was created?', ['200', '201', '400', '500'], 1, '201 Created indicates successful creation of a resource.', 'The response commonly includes a Location header or representation of the created resource.'],
    ['Which SQL join returns rows with matching keys in both tables?', ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'CROSS JOIN'], 2, 'INNER JOIN returns rows where the join condition matches in both tables.', 'LEFT JOIN additionally preserves unmatched rows from the left table.'],
    ['What is the main goal of database normalization?', ['Increase duplicate data', 'Reduce update anomalies', 'Remove all keys', 'Avoid all joins'], 1, 'Normalization structures relations to reduce unnecessary redundancy and insertion, update and deletion anomalies.', 'Normalization does not mean every query becomes faster; design depends on workload.'],
    ['Which OOP concept allows a subclass to provide a specialised implementation of a parent method?', ['Encapsulation', 'Method overriding', 'Compilation', 'Aggregation'], 1, 'Method overriding lets a subclass provide its own implementation of an inherited method.', 'Runtime polymorphism commonly uses overriding.'],
    ['What does a 401 HTTP response generally mean?', ['Resource created', 'Authentication is required or invalid', 'Server is healthy', 'Request succeeded'], 1, '401 indicates missing or invalid authentication credentials.', '403 means the server understood the request but refuses authorisation.'],
    ['Which Git command creates a new branch and switches to it in modern Git?', ['git status', 'git switch -c branch-name', 'git log', 'git fetch'], 1, 'git switch -c creates and checks out a new branch.', 'git checkout -b is also commonly used.'],
    ['What is the purpose of unit testing?', ['Test a small unit in isolation', 'Replace user acceptance testing', 'Measure network bandwidth only', 'Deploy production automatically'], 0, 'Unit tests check small functions or components in isolation to catch defects early.', 'Integration and end-to-end tests cover broader interactions.'],
    ['Which cloud model provides a managed platform for deploying applications without managing the underlying servers?', ['IaaS', 'PaaS', 'On-premises only', 'Bare metal'], 1, 'Platform as a Service provides a managed runtime and deployment platform.', 'The provider manages more of the platform than in IaaS.'],
    ['In Java, which keyword is used to inherit a class?', ['implements', 'extends', 'package', 'import'], 1, 'A Java class uses extends to inherit from another class.', 'A class uses implements to fulfil an interface contract.'],
    ['What is the main responsibility of an API gateway in a microservices system?', ['Act as a common entry point for API requests', 'Replace every database', 'Compile Java code', 'Store browser cookies only'], 0, 'An API gateway can route requests and centralise concerns such as authentication, rate limits and observability.', 'It should not become an uncontrolled source of business logic.']
  ],
  coding: sharedCoding,
  hr: sharedHr('Capgemini', 'technology consulting and engineering')
});

addCompany('tcs', {
  name: 'TCS', mark: 'T', type: 'IT services & consulting',
  focus: 'Enterprise software, digital transformation, application services and large-scale delivery.',
  behavioural: sharedBehavioural('TCS'),
  technical: [
    ['Which Java collection preserves insertion order and allows duplicate elements?', ['HashSet', 'ArrayList', 'TreeSet', 'Map'], 1, 'ArrayList preserves insertion order and allows duplicates.', 'HashSet does not guarantee insertion order; Map stores key-value pairs.'],
    ['Which OOP principle hides internal state and exposes controlled operations?', ['Encapsulation', 'Inheritance', 'Overloading', 'Recursion'], 0, 'Encapsulation bundles state and behaviour and controls access through methods or properties.', 'Private fields with public methods are a common Java example.'],
    ['Which SQL clause filters groups after aggregate calculations?', ['WHERE', 'ORDER BY', 'HAVING', 'DISTINCT'], 2, 'HAVING filters grouped results, often using aggregate expressions.', 'WHERE filters rows before grouping.'],
    ['What does ACID consistency mean in database transactions?', ['Every transaction preserves defined database rules', 'Data is always duplicated', 'Queries never fail', 'All tables must be identical'], 0, 'Consistency means a committed transaction moves the database from one valid state to another while preserving constraints.', 'ACID also includes atomicity, isolation and durability.'],
    ['Which operating-system structure represents a program currently being executed?', ['Process', 'Compiler', 'File extension', 'Packet'], 0, 'A process is an instance of a program in execution with its own execution context and resources.', 'A thread is an execution path within a process.'],
    ['Which protocol provides reliable, ordered byte-stream delivery?', ['UDP', 'TCP', 'DNS', 'ARP'], 1, 'TCP provides reliable, ordered delivery using acknowledgements and retransmission.', 'UDP is connectionless and does not guarantee delivery or ordering.'],
    ['What is the output concept of method overloading in Java?', ['Same method name with different parameter lists', 'Same signature in unrelated classes only', 'Deleting a method at runtime', 'Changing a variable type automatically'], 0, 'Overloading defines methods with the same name but different parameter lists in the same class or hierarchy.', 'Return type alone cannot distinguish overloaded methods.'],
    ['Which data structure is commonly used for breadth-first search?', ['Stack', 'Queue', 'Heap only', 'HashSet only'], 1, 'BFS uses a queue to process vertices in the order they are discovered.', 'DFS is commonly implemented with recursion or a stack.'],
    ['What does the GROUP BY clause do in SQL?', ['Sorts rows alphabetically only', 'Combines rows into groups for aggregation', 'Deletes duplicate tables', 'Encrypts columns'], 1, 'GROUP BY forms groups of rows sharing specified values so aggregate functions can be applied.', 'Use HAVING to filter groups.'],
    ['Which Java feature handles exceptional conditions during program execution?', ['Packages', 'Exception handling', 'Garbage collection only', 'Interfaces only'], 1, 'Java uses try, catch, finally, throw and throws for exception handling.', 'Checked and unchecked exceptions have different compile-time rules.'],
    ['What does DNS primarily do?', ['Maps domain names to network records such as IP addresses', 'Encrypts all web traffic', 'Compiles websites', 'Stores SQL tables'], 0, 'DNS resolves domain names to records, commonly including IP addresses.', 'DNS is separate from HTTPS encryption.'],
    ['Which practice helps prevent storing plain-text passwords?', ['Base64 encoding only', 'Use a password hashing function with a unique salt', 'Store passwords in logs', 'Use the same hard-coded password'], 1, 'Use a modern password-hashing function with a unique salt and appropriate work factor.', 'Encryption and encoding are not substitutes for password hashing.']
  ],
  coding: sharedCoding,
  hr: sharedHr('TCS', 'software engineering and enterprise technology')
});

addCompany('cognizant', {
  name: 'Cognizant (CTS)', mark: 'C', type: 'IT services & consulting',
  focus: 'Application development, digital engineering, cloud, data and business technology services.',
  behavioural: sharedBehavioural('Cognizant'),
  technical: [
    ['In JavaScript, what does Array.map() return?', ['The original array only', 'A new array containing mapped results', 'A boolean', 'A promise in every case'], 1, 'map() creates a new array from the values returned by the callback for each element.', 'It does not mutate the original array by itself.'],
    ['In React, what is the purpose of state?', ['Store data that can change and trigger a re-render', 'Define CSS files only', 'Replace all props', 'Connect directly to MongoDB'], 0, 'State stores component data that can change over time; updating it schedules a render.', 'Props are values passed from a parent component.'],
    ['What is the Node.js event loop used for?', ['Coordinate non-blocking callbacks and asynchronous work', 'Compile SQL schemas', 'Render CSS in the browser', 'Encrypt passwords automatically'], 0, 'The event loop coordinates callbacks and asynchronous operations so Node.js can handle I/O without blocking the main JavaScript thread.', 'Long CPU-bound work can still block the event loop.'],
    ['Which HTTP method is conventionally used to partially update a resource?', ['GET', 'POST', 'PATCH', 'TRACE'], 2, 'PATCH is conventionally used for partial resource updates.', 'PUT commonly represents replacement of a resource representation.'],
    ['What is the main use of a database index?', ['Speed up selected lookup patterns', 'Guarantee no bugs', 'Replace primary keys', 'Compress all application code'], 0, 'Indexes can speed up lookups and sorting for supported query patterns.', 'They use storage and can slow writes, so index design should follow actual queries.'],
    ['Which MongoDB structure stores documents?', ['Collection', 'CSS selector', 'Thread pool', 'HTTP header'], 0, 'A MongoDB collection stores BSON documents and is broadly comparable to a relational table.', 'Documents in a collection can have flexible fields.'],
    ['What is the purpose of middleware in Express?', ['Run request/response logic in the processing pipeline', 'Create browser DOM nodes', 'Replace the database engine', 'Compile TypeScript automatically'], 0, 'Express middleware can inspect or modify requests and responses, perform authentication, log requests or handle errors.', 'Middleware must call next() or end the response when appropriate.'],
    ['Which Git operation integrates changes from another branch into the current branch?', ['merge', 'init', 'status', 'diff'], 0, 'git merge integrates the histories and changes from another branch.', 'Resolve conflicts carefully and run tests after merging.'],
    ['What does CI commonly stand for in CI/CD?', ['Continuous Integration', 'Central Internet', 'Code Inspection only', 'Compiled Interface'], 0, 'Continuous Integration automates integrating changes and running checks such as builds and tests.', 'Continuous Delivery/Deployment extends the pipeline toward release.'],
    ['Which HTTP status class represents server-side errors?', ['2xx', '3xx', '4xx', '5xx'], 3, '5xx status codes indicate that the server failed to fulfil an apparently valid request.', '4xx codes generally indicate a client-side request problem.'],
    ['What is a microservice?', ['A small independently deployable service around a business capability', 'A CSS animation', 'A single SQL query', 'A browser bookmark'], 0, 'A microservice is a service organised around a capability and designed to be independently developed or deployed.', 'Service boundaries and operational complexity need careful design.'],
    ['Why should API input be validated on the server?', ['Client-side checks can be bypassed', 'Browsers never send invalid data', 'It improves CSS rendering', 'It removes the need for authentication'], 0, 'Server-side validation is essential because clients are not trusted and requests can be crafted outside the UI.', 'Validation complements authentication and authorisation.']
  ],
  coding: sharedCoding,
  hr: sharedHr('Cognizant', 'application development and digital engineering')
});

addCompany('accenture', {
  name: 'Accenture', mark: 'A', type: 'Professional services & technology consulting',
  focus: 'Technology transformation, cloud, data and AI, cybersecurity and digital consulting.',
  behavioural: sharedBehavioural('Accenture'),
  technical: [
    ['Which cloud service model provides virtual machines, storage and networking resources?', ['SaaS', 'PaaS', 'IaaS', 'FaaS only'], 2, 'Infrastructure as a Service provides compute, storage and networking resources.', 'PaaS provides a managed application platform; SaaS provides a finished application.'],
    ['What is the purpose of least-privilege access?', ['Give every user administrator access', 'Grant only the permissions needed for a task', 'Disable all authentication', 'Share one account'], 1, 'Least privilege limits access to the minimum permissions required for a user or service.', 'It reduces the impact of mistakes and compromised accounts.'],
    ['What is a key benefit of CI/CD pipelines?', ['Automate build, test and release steps', 'Remove the need for code review', 'Guarantee zero defects', 'Replace product requirements'], 0, 'CI/CD pipelines automate repeatable checks and delivery steps, improving feedback and release consistency.', 'Automation does not eliminate the need for good tests and review.'],
    ['Which SQL feature is commonly used to speed up lookups on selected columns?', ['Index', 'Trigger only', 'View only', 'Stored procedure only'], 0, 'An index helps the database locate rows more efficiently for matching query patterns.', 'Indexes should be selected based on workload and query plans.'],
    ['What does SaaS provide to an end user?', ['A complete application delivered as a service', 'Only physical servers', 'A programming language', 'A local network cable'], 0, 'Software as a Service delivers a ready-to-use application managed by the provider.', 'Users typically configure and use the application rather than manage its infrastructure.'],
    ['Which practice is most appropriate for protecting sensitive data in transit?', ['Use HTTPS/TLS', 'Put secrets in URLs', 'Disable certificate validation', 'Send passwords in plain text'], 0, 'HTTPS uses TLS to protect data in transit and authenticate the server when configured correctly.', 'Sensitive data also needs protection at rest and controlled access.'],
    ['What is the main purpose of an API contract?', ['Define how systems exchange requests and responses', 'Choose a laptop brand', 'Store passwords in source code', 'Replace monitoring'], 0, 'An API contract describes endpoints, methods, schemas, status codes and expected behaviour.', 'Clear contracts help teams integrate independently.'],
    ['In Agile, what is a product backlog?', ['An ordered list of work items and improvements', 'A list of production passwords', 'A database backup only', 'A fixed yearly timetable'], 0, 'The product backlog is an ordered, evolving list of work needed to improve the product.', 'Priorities can change as feedback and business needs evolve.'],
    ['Which approach helps protect an application from SQL injection?', ['Build SQL by concatenating raw input', 'Use parameterised queries', 'Hide the submit button', 'Rely only on client-side validation'], 1, 'Parameterised queries separate SQL structure from user-supplied values.', 'Also apply least privilege and appropriate input validation.'],
    ['What is the purpose of a load balancer?', ['Distribute incoming traffic across available servers', 'Encrypt every database field', 'Compile frontend JavaScript', 'Replace DNS records entirely'], 0, 'A load balancer distributes requests across healthy targets to improve availability and resource use.', 'Health checks and session behaviour need consideration.'],
    ['Which testing level checks interactions between multiple components?', ['Unit testing', 'Integration testing', 'Static typing only', 'Linting only'], 1, 'Integration testing checks whether components or services work together correctly.', 'Unit tests focus on isolated units; end-to-end tests cover full user journeys.'],
    ['What does data minimisation mean?', ['Collect only data needed for a defined purpose', 'Collect every possible field', 'Keep all data forever', 'Share data publicly by default'], 0, 'Data minimisation limits collection to what is necessary for the stated purpose.', 'Retention and access should also follow applicable policy and law.']
  ],
  coding: sharedCoding,
  hr: sharedHr('Accenture', 'technology consulting and digital transformation')
});

// Metadata for the original company banks.
companyBank.amazon.type = 'Product & technology';
companyBank.amazon.focus = 'Customer-facing products, distributed systems, software engineering and operational ownership.';
companyBank.amazon.sourceNote = 'Original PlacePoint practice material inspired by public leadership principles and common software interview topics; not a verified archive of past interview questions.';
companyBank.google.type = 'Product & technology';
companyBank.google.focus = 'Algorithms, data structures, software design, large-scale systems and problem solving.';
companyBank.google.sourceNote = 'Original PlacePoint practice material aligned with widely known software engineering interview topics; not a verified archive of past interview questions.';
companyBank.zoho.type = 'Product & SaaS';
companyBank.zoho.focus = 'Business software, product engineering, application development and customer workflows.';
companyBank.zoho.sourceNote = 'Original PlacePoint practice material aligned with common fresher software and product-company interview topics; not a verified archive of past interview questions.';
