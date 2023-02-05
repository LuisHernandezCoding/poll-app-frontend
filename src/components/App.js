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
      <header className="header">
        <h1 className="name">Polls API</h1>
      </header>
      <main className="main">
        {/*
          Here we are mapping the data as react-polls has different
          variable naming when compared to our Polls API

          To avoid this, we can use graphql aliases, which changes
          our query to the following below.

          This is done intentionally to explain this concept of aliasing
          as many developers think that they have to change the backend
          to fit accordingly, which actually we can just use alias.

          {
            polls {
              question: question
              answers: choices {
                option: choiceText
                vootes: votesCount
              }
            }
          }

         */}
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
