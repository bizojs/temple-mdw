## Install modules

> `npm i`

## Set up environment variables

Create a `.env` file in the root directory and copy the contents of `.env.example` into it. Fill out the correct file name for your database. For localhost I recommend this:
```js
DATABASE_URL="file:./dev.db"
```

## Create the database file

Run the commands `npx prisma generate` and then `npx prisma db push` to generate the database file.

## Seed the database (coming soon...)

To create some base values (admin account), run the command `npx prisma db seed`

## Start the app

Starting the app for local production is as simple as `npm run dev`. If you want it to run on a different port (current is 4444), run `npm run dev -- --port 6969`

## Database UI

If you want to see / edit database values in a nice GUI, in a new terminal type `npx prisma studio`. It will automatically open the page in your browser!

## Building

To create a production version:

> `npm run build`

You can preview the production build with `npm run preview`.
