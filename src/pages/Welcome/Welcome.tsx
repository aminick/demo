import React from 'react';
import { UserContext } from '@/UserProvider';
import Button from '@/components/Button';

const Welcome = () => {
  const [count, setCount] = React.useState(0);
  const user = React.useContext(UserContext);
  return (
    <div>
      <p>Home</p>
      <Button onClick={() => setCount(count + 1)}>count: {count}</Button>
      <pre>{JSON.stringify(user, null, 4)}</pre>
    </div>
  );
};

export default Welcome;
