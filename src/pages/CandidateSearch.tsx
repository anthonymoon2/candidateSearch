import { useEffect, useState } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // state to hold candidates in an array
  const [candidates, setCandidate] = useState<Candidate[]> ([]);
  // state to hold current candidate index
  const [currentCandidateIndex, setcurrentCandidateIndex] = useState(0);
  // state to set loading screen
  const [loading, setLoading] = useState(false);
  // state to hold number of fetched users 
  const [numUsers, setNumUsers] = useState(0);

  // call useEffect to load when page loads
  useEffect(() => {
    const fetchUsers = async() => {
      try {
        setLoading(true);

        const fetchedUsers = await searchGithub();

        // new array to store candidates
        const newCandidates: Candidate[] = [];

        for (let i=0; i<fetchedUsers.length; i++){
          // set current user to the data of url link
          const currUser = await searchGithubUser(fetchedUsers[i].login)
          console.log(`USER ${JSON.stringify(currUser)}`);

          // create new candidate object using Candidate interface
          const newCandidate: Candidate = {
            name: currUser.login,
            image: currUser.avatar_url,
            location: currUser.location,
            email: currUser.email,
            company: currUser.company,
            bio: currUser.bio,
          }
          console.log(newCandidate);

          // add new candidate to array
          newCandidates.push(newCandidate);
        }
        // set the state candidates array to hold all new candidates
        setCandidate(newCandidates);
        setLoading(false);
        setNumUsers(newCandidates.length);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const rejectClick = async() => {
    setcurrentCandidateIndex(currentCandidateIndex+1);
    console.log(`After click: ${currentCandidateIndex}`);
  };
  
  const acceptClick = async() => {
    // get current users in potential candidates local storage
    let storedCandidates = JSON.parse(localStorage.getItem("potentialCandidates") || "[]");

    // get the current user
    const currentUser = candidates[currentCandidateIndex];

    // push current user to pulled array
    storedCandidates.push(currentUser);

     // Save the updated array back to local storage
    localStorage.setItem("potentialCandidates", JSON.stringify(storedCandidates));

    setcurrentCandidateIndex(currentCandidateIndex+1);
  }

  return (
    <div className='page-container'>
      <h1>CandidateSearch</h1>
      {currentCandidateIndex < numUsers ? ( // if true
        loading ? ( // if true
          <h3>Fetching Candidates...</h3>
        ) : ( // if false
          <div>
            <div className="candidateCard">
              <img src={candidates[currentCandidateIndex]?.image} alt="No photo available." className="candidateCard-image"></img>
              <h2>{candidates[currentCandidateIndex]?.name}</h2>
              <h3>Location: {candidates[currentCandidateIndex]?.location || "none"}</h3>
              <h3>Email: {candidates[currentCandidateIndex]?.email || "none"}</h3>
              <h3>Company: {candidates[currentCandidateIndex]?.company || "none"}</h3>
              <p>Bio: {candidates[currentCandidateIndex]?.bio || "none"}</p>
            </div>

            <div className="buttons-container">
              <button className="button-reject" onClick={rejectClick}>-</button>
              <button className="button-accept" onClick={acceptClick}>+</button>
            </div>
          </div>
        )
      ):( // if false
        <div>
          <h3>No more users</h3>
        </div>
      )}
    </div>
  )
};

export default CandidateSearch;
