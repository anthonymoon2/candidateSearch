import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const getPotentialCandidates = () => {
    // get current users in potential candidates local storage
    const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem("potentialCandidates") || "[]");

    return storedCandidates.map((candidate: Candidate, index: number) => (
      <div className="table-user-container" key={index}>
        <div className="table-user">
          <img src={candidate?.image} className="box-image"></img>
        </div>
        <div className="table-user">{candidate?.name}</div>
        <div className="table-user">{candidate?.location}</div>
        <div className="table-user">{candidate?.email}</div>
        <div className="table-user">{candidate?.company}</div>
        <div className="table-user">{candidate?.bio}</div>
        <div className="table-user">
          <button className='button-reject' onClick={() => deletePotentialCandidate(index)}>-</button>
        </div>
      </div>
    ));
  }

  const deletePotentialCandidate = (index: number) => {
    console.log(`delete ${index}`);
    const storedCandidates: Candidate[] = JSON.parse(localStorage.getItem("potentialCandidates") || "[]");

    // remove selected candidate
    storedCandidates.splice(index, 1)

    // set the local storage array with new updated array 
    localStorage.setItem("potentialCandidates", JSON.stringify(storedCandidates));

    // reload window to show updated candidates
    window.location.reload();
  }

  return (
    <>
      <h1>Potential Candidates</h1>

      <div className="table">
        <div className="table-container">
          <div className="table-box">Image</div>
          <div className="table-box">Name</div>
          <div className="table-box">Location</div>
          <div className="table-box">Email</div>
          <div className="table-box">Company</div>
          <div className="table-box">Bio</div>
          <div className="table-box">Reject</div>
        </div>

        {getPotentialCandidates()}
      </div>
    </>
  );
};

export default SavedCandidates;
