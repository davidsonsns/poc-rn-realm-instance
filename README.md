# POC - React Native Realm Instance

This project was initially cloned by [MongoDB University - realm-tutorial](https://github.com/mongodb-university/realm-tutorial/tree/main/rn) and the first thing made was to change the structure to use [Typescript](https://reactnative.dev/docs/typescript#adding-typescript-to-an-existing-project).

The main goal here is to create a POC, or maybe to propose some alternative maybe, to how creating a default Realm instance without stuck the app while running a long [`migration`](https://realm.io/docs/javascript/latest/#migrations) processing.

## Steps

### Install dependencies:

```sh
# install package.json dependencies
yarn install

# install pod dependecies
cd ios && pod install && cd ..

# run app
yarn ios # or yarn android
```

### Migration testing

1. Run the app and add fake tasks using the seed button on the top. To see how long your app can be stuck I highly recommend adding more than 200000 items.
2. Close the app and change the lines below:

```
2.1 `./src/database/index.ts` => change line 5 to value 1;
2.2 `./src/database/Task.ts` => uncomment line 38
```

3. Open the app again and you should see the `ActivityIndicator` running while realm runs the migration.