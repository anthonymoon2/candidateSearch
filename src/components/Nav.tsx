import { Link } from 'react-router-dom';

const Nav = () => {
  // DONE: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/SavedCandidates">Saved Candidates</Link>
      </nav>
    </div>
  )
};

export default Nav;
