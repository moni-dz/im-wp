This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

[Install Bun. (a nodejs compatible runtime)](https://bun.sh/)
[Install MariaDB](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/)

Initialize the database.

```bash
# command prompt / shell
mariadb -u mysql # depends on your MariaDB setup
```
```sql
-- inside the MariaDB query console
MariaDB [(none)]> create database db_imwp;
```
```bash
# back in the command prompt / shell
mariadb -u mysql db_imwp < src/db/schema.sql
```
```sql
-- check inside the MariaDB query console for correctness
MariaDB [(none)]> use db_imwp;
MariaDB [(db_imwp)]> show tables;
```

Then, run the development server:

```bash
bun i
bun --bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Screenshots

![](./1.png)
![](./2.png)