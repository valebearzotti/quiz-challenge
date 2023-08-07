# Tech Challenge - Rather Labs - Full Stack Developer

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

The project includes the following packages:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

Yet I only use Next.js and Tailwind CSS from this stack. Apart from that, I use Ethers.js for interacting with the Ethereum blockchain & ecosystem. I could have used Wagmi or any other similar library and save some time but for this particular project I thought of using Ethers.js and writing my own hooks.

Other resources:

- [MetaMask Docs](https://docs.metamask.io/)
- [Ethers.js Docs](https://docs.ethers.io/v5/)

Notes:
The survey's main image was not found so I replaced it with the first's question image.

## Train of thought

Initially I considered it'd be a nice touch to implement some sort of "simulated" fecthing where I could just return the survey data from the sample json and then manipulate it through the different rendering methods Next allows, like getStaticProps or getServerSideProps. The best option would've been the first one for this case. I considered the real life application would've been fetching to a DB and getting the daily trivia. I kind of opt this out cause it would've been over engineering at least for this challenge.

I also opted React Query out since I wasn't fetching anything, and my requirements could've been easily achieved with the Context API and some custom hooks.

Another thought I had was to let the user's complete the survey even though they didn't connect their wallet prior to it. I thought it'd make the flow much more user friendly, since they can always submit -> trigger connection -> submit their results after that (as long as they don't leave the page they wouldn't lose them).

## Reviewing the code

### Components

The components folder features seven different components, some of them more reusable than others.

1. Button: this is a button component that holds several variant combinations between the intent and size of them.
2. Header: header component used in the Layout which logic comes from different hooks and context to update the UI depending on the user's interaction with MM.
3. Layout: this is the main layout component that wraps the whole app and holds the header component and styles the main container.
4. Notification: notification component and portal that holds the logic to show the user a notification when needed. There's also a context that holds the logic to it and allows me to reutilize the showNotification() function in any component. It receives a message and a type (success, error, warning, info) and renders the notification with the corresponding styles.
5. Question: this is the main component that renders the question and its answers. Its logic comes from the surveyContext too and handles the user interaction with it, the timing and the state of the question.
6. Results: used for rendering the answers selected by the user in the previous component.
7. Tracker: used for timing the lifetime of the question.

### Context

1. NotificationContext: holds the logic to show the notification component.
2. SurveyContext: holds the logic to handle the survey data, the user's answers and the timing of the question.
3. Web3Context: in this case I kept the logic in a custom hook just for better readability and the intent of reutilizing it in other projects, but the fact that is a context allows me to access the hook values in any component under the provider. It's specially used for tracking the user's account and balance among different routes.

### Data

Holds the survey's JSON. I added an id to the survey.

### Hooks

1. useContract: this hook is used for interacting with the contract and its methods.
2. useWeb3: this hook is used for interacting with MM and its methods.

### Pages

Holds the routing of the site. Instead of holding everything like a SPA I chose to create a /survey route where I'd display the daily survey to take. Results are rendered there too, conditionally.

### Styles

Holds the global styles and the tailwind config file.

### Types

Some typing for handling the survey, question and options of the sample JSON.
