import React from 'react';

const TodoApp = React.lazy(() => import('todoApp/TodoApp'));

const App: React.FC = () => (
  <React.Suspense fallback="Loading...">
    <div>
      <h1>Host App</h1>
      <TodoApp />
    </div>
  </React.Suspense>
);

export default App;