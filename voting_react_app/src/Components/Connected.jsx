import React from 'react';

const Connected = (props) => {
    return (
        <div className='login-container'>
            <h1 className='connected-header'>Voting Dapp</h1>
            <h1 className='connected-account'>Your Wallet Address : {`${props.account.slice(0,4)}...${props.account.slice(-4)}`}</h1>
            <h1 className='connected-account'>Time Left : {Math.floor(props.remainingTime/60)} Minutes</h1>
            <div>
            {props.votingStatus? (
                props.voted ? (
                    <>
                        <p className='connected-header'>You have already voted.</p>
                    </>
                ): (
                    <>
                        <input type="number" placeholder='Index' value={props.number} onChange={props.handleNumberChange}></input>
                        <button className='login-button' onClick={props.voteFunction}>Vote</button>
                    </>
                )):(
                    <>
                        <p className='connected-header'>Votes over. Please find voting result.</p>
                    </>
                )}
            </div>

            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>Candidate Info</th>
                    </tr>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {props.candidates.map((candidate, index)=>(
                        <tr key={index}>
                            <td>{candidate.index}</td>
                            <td>{candidate.name}</td>
                            <td>{candidate.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Connected;