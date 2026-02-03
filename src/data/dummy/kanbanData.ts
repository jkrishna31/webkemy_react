export const kanbanData = [
  {
    id: "t2",
    name: "Define coding standards",
    desc: "Document linting rules, naming conventions, and folder structure.",
    tags: ["Docs"],
    status: "backlog",
    assigneeId: "u2"
  },
  {
    id: "t3",
    name: "Design Kanban board UI",
    desc: "Create layout and component structure for the Kanban board.",
    tags: ["UI"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t5",
    name: "Create task data model",
    desc: "Define task schema and validation rules.",
    tags: ["Backend", "Model"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t6",
    name: "Implement task CRUD APIs",
    desc: "Build APIs for creating, updating, and deleting tasks.",
    tags: ["Backend", "API"],
    status: "prRaised",
    assigneeId: "u2"
  },
  {
    id: "t7",
    name: "Review API implementation",
    desc: "Perform code review and suggest improvements.",
    tags: ["Review", "Backend"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t8",
    name: "Finalize project requirements",
    desc: "Confirm functional and non-functional requirements.",
    tags: ["Planning"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t9",
    name: "Integrate drag and drop",
    desc: "Enable drag-and-drop functionality for task movement.",
    tags: ["Frontend"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t10",
    name: "Add task filters",
    desc: "Filter tasks by status, assignee, and tags.",
    tags: ["Frontend", "Feature"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t11",
    name: "Implement auth middleware",
    desc: "Protect APIs using authentication middleware.",
    tags: ["Security", "Backend"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t12",
    name: "Fix drag flicker bug",
    desc: "Resolve UI flicker while dragging task cards.",
    tags: ["Bug", "UI"],
    status: "qaTesting",
    assigneeId: "u3"
  },
  {
    id: "t13",
    name: "Write unit tests",
    desc: "Add unit tests for task reducers and services.",
    tags: ["Testing"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t14",
    name: "Improve task card accessibility",
    desc: "Add ARIA roles and keyboard navigation.",
    tags: ["A11y", "Frontend"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t15",
    name: "Refactor state management",
    desc: "Simplify task state logic and remove duplication.",
    tags: ["Frontend"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t16",
    name: "QA regression testing",
    desc: "Test all flows after recent merges.",
    tags: ["QA", "Testing"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t17",
    name: "Deploy to staging",
    desc: "Deploy latest build and verify environment variables.",
    tags: ["Deployment", "DevOps"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t18",
    name: "Optimize bundle size",
    desc: "Analyze and reduce JS bundle size.",
    tags: ["Performance", "Frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t19",
    name: "Add empty state UI",
    desc: "Show helpful empty states for columns with no tasks.",
    tags: ["UI", "UX"],
    status: "inProgress",
    assigneeId: "u4"
  },
  {
    id: "t20",
    name: "Fix API error handling",
    desc: "Standardize error responses across APIs.",
    tags: ["Bug", "Backend"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t21",
    name: "Verify permissions logic",
    desc: "Ensure users can only modify allowed tasks.",
    tags: ["Security", "QA"],
    status: "qaTesting",
    assigneeId: "u2"
  },
  {
    id: "t22",
    name: "Release notes draft",
    desc: "Prepare initial release notes for v1.0.",
    tags: ["Docs", "Release"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t23",
    name: "Clean up console warnings",
    desc: "Remove unused logs and fix warnings.",
    tags: ["Frontend"],
    status: "done",
    assigneeId: "u3"
  },
  {
    id: "t25",
    name: "Add confirmation modals",
    desc: "Confirm destructive actions like delete.",
    tags: ["UX", "Frontend"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t26",
    name: "Fix mobile layout issues",
    desc: "Resolve overflow and spacing issues on small screens.",
    tags: ["Responsive", "UI"],
    status: "qaTesting",
    assigneeId: "u1"
  },
  {
    id: "t27",
    name: "Finalize UI polish",
    desc: "Spacing, colors, and hover state refinements.",
    tags: ["UI"],
    status: "prRaised",
    assigneeId: "u3"
  },
  {
    id: "t28",
    name: "Set up monitoring",
    desc: "Add basic logging and error monitoring.",
    tags: ["Monitoring", "DevOps"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t29",
    name: "User acceptance testing",
    desc: "Validate features with stakeholders.",
    tags: ["UAT", "Testing"],
    status: "qaTesting",
    assigneeId: "u4"
  },
  {
    id: "t30",
    name: "Production deployment",
    desc: "Deploy application to production environment.",
    tags: ["Deployment", "Release"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t31",
    name: "Add task search",
    desc: "Enable text-based search across task names and descriptions.",
    tags: ["Frontend", "Feature"],
    status: "backlog",
    assigneeId: "u2"
  },
  {
    id: "t32",
    name: "Column reorder support",
    desc: "Allow users to reorder Kanban columns via drag and drop.",
    tags: ["UI", "Frontend"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t33",
    name: "Persist board state",
    desc: "Save column and task order to backend.",
    tags: ["Backend", "API"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t34",
    name: "Audit log for task changes",
    desc: "Track status and assignee changes for tasks.",
    tags: ["Backend"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t35",
    name: "Improve loading skeletons",
    desc: "Enhance skeleton loaders for board and cards.",
    tags: ["UI", "UX"],
    status: "inProgress",
    assigneeId: "u3"
  },
  {
    id: "t38",
    name: "Add keyboard shortcuts",
    desc: "Support shortcuts for creating and moving tasks.",
    tags: ["A11y", "Frontend"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t39",
    name: "Enhance task details view",
    desc: "Show expanded task information in a side panel.",
    tags: ["UI", "Feature"],
    status: "inProgress",
    assigneeId: "u4"
  },
  {
    id: "t40",
    name: "Backend pagination support",
    desc: "Paginate task APIs for large boards.",
    tags: ["Backend", "Performance"],
    status: "prRaised",
    assigneeId: "u2"
  },
  {
    id: "t41",
    name: "Cross-browser testing",
    desc: "Validate board behavior across major browsers.",
    tags: ["QA", "Testing"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t42",
    name: "Improve error toasts",
    desc: "Show clearer error messages for failed actions.",
    tags: ["UX", "Frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t43",
    name: "Task assignment history",
    desc: "Display previous assignees for a task.",
    tags: ["Feature", "Backend"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t44",
    name: "Refine API validation",
    desc: "Add stricter validation for task updates.",
    tags: ["Backend", "Security"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t47",
    name: "Board empty project flow",
    desc: "Guide users when creating their first task.",
    tags: ["UX", "UI"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t48",
    name: "Normalize API responses",
    desc: "Ensure consistent response structure across endpoints.",
    tags: ["Backend", "API"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t49",
    name: "Visual status indicators",
    desc: "Add subtle indicators for task status changes.",
    tags: ["UI"],
    status: "inProgress",
    assigneeId: "u1"
  },
  {
    id: "t50",
    name: "Security vulnerability scan",
    desc: "Run dependency and vulnerability scans.",
    tags: ["Security", "QA"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t51",
    name: "Reduce re-renders",
    desc: "Optimize component rendering during drag operations.",
    tags: ["Performance", "Frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t53",
    name: "Backend logging cleanup",
    desc: "Remove noisy logs and standardize log levels.",
    tags: ["Backend", "Monitoring"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t55",
    name: "Improve column headers",
    desc: "Enhance column header layout and spacing.",
    tags: ["UI"],
    status: "done",
    assigneeId: "u3"
  },
  {
    id: "t57",
    name: "Finalize onboarding docs",
    desc: "Complete setup and onboarding documentation.",
    tags: ["Docs"],
    status: "done",
    assigneeId: "u4"
  },
  {
    id: "t58",
    name: "Release candidate build",
    desc: "Prepare and tag release candidate build.",
    tags: ["Release", "Deployment"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t59",
    name: "Post-release monitoring review",
    desc: "Review logs and metrics after production release.",
    tags: ["Monitoring", "DevOps"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t60",
    name: "Collect user feedback",
    desc: "Gather early feedback and improvement ideas.",
    tags: ["Planning", "UX"],
    status: "backlog",
    assigneeId: "u1"
  },
  {
    id: "t61",
    name: "Board load performance audit",
    desc: "Measure initial board load time and identify bottlenecks.",
    tags: ["Performance", "Frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t62",
    name: "Add retry logic for APIs",
    desc: "Retry failed API calls with exponential backoff.",
    tags: ["Backend", "API"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t63",
    name: "Improve drag placeholder UI",
    desc: "Make drop indicators clearer while dragging cards.",
    tags: ["UI", "UX"],
    status: "inProgress",
    assigneeId: "u1"
  },
  {
    id: "t64",
    name: "Validate task status transitions",
    desc: "Restrict invalid task status movements.",
    tags: ["Backend", "Security"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t65",
    name: "Column width responsiveness",
    desc: "Adjust column widths dynamically on resize.",
    tags: ["Responsive", "Frontend"],
    status: "backlog",
    assigneeId: "u3"
  },
  {
    id: "t68",
    name: "Improve API auth error messages",
    desc: "Return clearer messages for auth failures.",
    tags: ["Backend", "Security"],
    status: "prRaised",
    assigneeId: "u1"
  },
  {
    id: "t70",
    name: "Manual exploratory testing",
    desc: "Explore edge cases not covered by test plans.",
    tags: ["QA", "Testing"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t71",
    name: "Board-level permissions review",
    desc: "Verify read/write permissions at board level.",
    tags: ["Security", "QA"],
    status: "backlog",
    assigneeId: "u2"
  },
  {
    id: "t72",
    name: "Optimize drag event listeners",
    desc: "Reduce unnecessary event handlers during drag.",
    tags: ["Performance", "Frontend"],
    status: "prRaised",
    assigneeId: "u3"
  },
  {
    id: "t73",
    name: "Improve tooltip consistency",
    desc: "Standardize tooltip styles and behavior.",
    tags: ["UI"],
    status: "done",
    assigneeId: "u1"
  },
  {
    id: "t74",
    name: "Backend rate limiting",
    desc: "Add rate limiting to protect APIs.",
    tags: ["Backend", "Security"],
    status: "done",
    assigneeId: "u4"
  },
  {
    id: "t75",
    name: "Accessibility audit",
    desc: "Run full accessibility audit on the board.",
    tags: ["A11y", "QA"],
    status: "qaTesting",
    assigneeId: "u5"
  },
  {
    id: "t77",
    name: "Add backend health endpoint",
    desc: "Expose health-check endpoint for monitoring.",
    tags: ["Backend", "Monitoring"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t78",
    name: "Deployment rollback strategy",
    desc: "Document and test rollback steps.",
    tags: ["Deployment", "DevOps"],
    status: "backlog",
    assigneeId: "u5"
  },
  {
    id: "t79",
    name: "Fix focus loss on drag end",
    desc: "Restore keyboard focus after drag completes.",
    tags: ["Bug", "A11y"],
    status: "qaTesting",
    assigneeId: "u1"
  },
  {
    id: "t84",
    name: "Monitoring alert thresholds",
    desc: "Configure alert thresholds for errors.",
    tags: ["Monitoring", "DevOps"],
    status: "inProgress",
    assigneeId: "u4"
  },
  {
    id: "t85",
    name: "Refine task card spacing",
    desc: "Adjust margins and padding for readability.",
    tags: ["UI", "UX"],
    status: "done",
    assigneeId: "u3"
  },
  {
    id: "t86",
    name: "Backend config cleanup",
    desc: "Remove unused environment variables.",
    tags: ["Backend"],
    status: "done",
    assigneeId: "u1"
  },
  {
    id: "t87",
    name: "Update release documentation",
    desc: "Finalize docs for the latest release.",
    tags: ["Docs", "Release"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t88",
    name: "Post-deployment smoke tests",
    desc: "Run basic checks after deployment.",
    tags: ["QA", "Deployment"],
    status: "qaTesting",
    assigneeId: "u2"
  },
  {
    id: "t89",
    name: "Plan next sprint backlog",
    desc: "Identify and prioritize next sprint tasks.",
    tags: ["Planning"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t92",
    name: "Cache task list responses",
    desc: "Cache task list API responses to reduce load.",
    tags: ["Performance", "Backend"],
    status: "inProgress",
    assigneeId: "u2"
  },
  {
    id: "t93",
    name: "Improve drag hit areas",
    desc: "Increase drop target tolerance for better UX.",
    tags: ["UX", "Frontend"],
    status: "inProgress",
    assigneeId: "u1"
  },
  {
    id: "t99",
    name: "Add board refresh shortcut",
    desc: "Allow users to refresh board via keyboard.",
    tags: ["A11y", "Feature"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t100",
    name: "API timeout handling",
    desc: "Gracefully handle API request timeouts.",
    tags: ["Backend", "API"],
    status: "prRaised",
    assigneeId: "u2"
  },
  {
    id: "t104",
    name: "Optimize filter performance",
    desc: "Reduce re-computation when filters change.",
    tags: ["Performance", "Frontend"],
    status: "prRaised",
    assigneeId: "u4"
  },
  {
    id: "t106",
    name: "Security permission regression tests",
    desc: "Ensure permission fixes don’t break access rules.",
    tags: ["Security", "QA"],
    status: "qaTesting",
    assigneeId: "u2"
  },
  {
    id: "t109",
    name: "Improve task reorder animation",
    desc: "Smooth animations when tasks reorder.",
    tags: ["UI", "UX"],
    status: "inProgress",
    assigneeId: "u4"
  },
  {
    id: "t110",
    name: "Backend task archival job",
    desc: "Add scheduled cleanup for archived tasks.",
    tags: ["Backend"],
    status: "prRaised",
    assigneeId: "u2"
  },
  {
    id: "t113",
    name: "Document task lifecycle",
    desc: "Explain task status transitions in docs.",
    tags: ["Docs", "Planning"],
    status: "backlog",
    assigneeId: "u4"
  },
  {
    id: "t114",
    name: "Security dependency review",
    desc: "Review dependencies for security risks.",
    tags: ["Security"],
    status: "qaTesting",
    assigneeId: "u1"
  },
  {
    id: "t115",
    name: "Refine column spacing",
    desc: "Adjust gaps between columns for clarity.",
    tags: ["UI"],
    status: "done",
    assigneeId: "u3"
  },
  {
    id: "t116",
    name: "Backend query index tuning",
    desc: "Add indexes to frequently queried fields.",
    tags: ["Backend", "Performance"],
    status: "done",
    assigneeId: "u2"
  },
  {
    id: "t117",
    name: "Finalize user guide",
    desc: "Complete end-user documentation.",
    tags: ["Docs"],
    status: "done",
    assigneeId: "u5"
  },
  {
    id: "t118",
    name: "Release readiness review",
    desc: "Final review before production release.",
    tags: ["Release", "QA"],
    status: "done",
    assigneeId: "u4"
  },
];
