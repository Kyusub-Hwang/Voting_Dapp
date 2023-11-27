import React from 'react';

const Connected = (props) => {
    return (
        <div className='login-container'>
            <h1 className='connected-header'>You are conntected to Metamask</h1>
            <h1 className='connected-account'>Metamask account : {props.account}</h1>
            <h1 className='connected-account'>Remaining Time : {Math.floor(props.remainingTime/60)} Minutes</h1>

            <div>
                <input type="number" placeholder='Enter Candidate number' value={props.number} onChange={props.handleNumberChange}></input>
                <button className='login-button' onClick={props.voteFunction}>Vote</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Candidate Name</th>
                        <th>Candidate Votes</th>
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