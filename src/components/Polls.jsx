import React, { useState, useEffect } from 'react';
import Poll from 'react-polls';
import PropTypes from 'prop-types';

const Polls = ({ polls }) => {
  const [pollData, updatePollData] = useState([]);

  // Some custom style for the polling box
  // More on this can be found here => https://github.com/viniciusmeneses/react-polls#customize
  const pollStyles = {
    questionSeparator: true,
    questionSeparatorWidth: 'question',
    questionBold: true,
    questionColor: '#303030',
    align: 'center',
    theme: 'cyan',
  };

  // Replacing ComponentDidMount, ComponentDidUpdate and ComponentDidUnmount
  // And runs only when the polls are updated (the array in the end with `polls`)

  // More on useEffect hook => https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    updatePollData(polls);
  }, [polls]);

  // Simple onClick method used to handle Voting
  // This is a pseudo method, i.e. it just updates the
  // state of pollData and not the actual data on server
  const handleVote = (voteAnswer, pollNumber) => {
    const newPollData = [...pollData];

    // Increment no. of votes on the choice clicked
    newPollData.map((poll) => (
      poll.id === pollNumber ? poll.answers
        .map((answer) => (answer.option === voteAnswer ? answer.votes + 1 : null)) : null
    ));

    // Here we can implement a mutation to update the vote
    // made by particular user

    // state hook to update pollData
    updatePollData(newPollData);
  };

  // Renders the Polls
  const renderPolls = () => pollData.map(
    (poll) => (
      <div key={poll.id}>
        <div>
          <Poll
            question={poll.question}
            answers={poll.answers}
            onVote={(voteAnswer) => handleVote(voteAnswer, poll.id)}
            customStyles={pollStyles}
            noStorage
          />
        </div>
      </div>
    ),
  );

  // Renders Poll which is from the package `react-polls`
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="box">
              <h1 className="title is-1 has-text-centered">Polls</h1>
              <div className="polls">
                {renderPolls()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Polls.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      option: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

export default Polls;
