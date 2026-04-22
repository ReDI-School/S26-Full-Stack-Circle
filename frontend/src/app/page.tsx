import { redirect } from 'next/navigation';

// TODO: Later we have to check if the user is logged in or not to make this redirect to the right page
const Home = () => redirect('/sign-in');

export default Home;
