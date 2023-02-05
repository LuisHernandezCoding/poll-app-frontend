// Default imports
import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

// Custom imports
import Polls from './Polls';

// GraphQL query to get polls, choices and the number of votes
const GET_POLLS = gql`
{
  polls {
    id
    question
    choices {
      choiceText
      votesCount
    }
  }
}
`;

function App() {
  // Calling the useQuery hook of react-apollo, and observe that
  // we have configured the graphql settings once in index,js.
  // We don't need to configure it again in the entire app
  const { loading, error, data } = useQuery(GET_POLLS);

  if (loading) return 'Loading...';
  if (error) return `Error :  ${error.message}`;

  return (
    <div className="app">
      <main className="main">
        <Polls polls={data.polls.map(
          (poll) => ({
            id: poll.id,
            question: poll.question,
            answers: poll.choices.map((choice) => ({
              option: choice.choiceText,
              votes: choice.votesCount,
              id: choice.id,
            })),
          }),
        )}
        />
      </main>
    </div>
  );
}

export default App;
