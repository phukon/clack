/**
 * This is server side action.
 * I may use it in the future again.
 */

/* import { auth, signOut } from '@/auth';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';

          await signOut(); // this signOut function was made exclusively for server actions
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
*/

// -------------------------------------

/**
 * This is a combination of server action and a client component!
 */
'use client';
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };

  return (
    <div className=' bg-white p-10 rounded-xl'>
      <button onClick={onClick}>Sign out</button>
    </div>
  );
};

export default SettingsPage;
