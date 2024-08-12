import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const DataCleaning = async () => {

  const {userId} = auth();

  const isAuth = !!userId;
  const user = await currentUser();

  if(!isAuth) {
    redirect("/");
  }
  
  return (
    <div>DataCleaning </div>
  )
}

export default DataCleaning