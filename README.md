# react-api-manager
This api manager provides a useful useApi hook to easily handle the api request state

*Base on work by [Thomas Findlay](https://github.com/ThomasFindlay/react-advanced-london-managing-apis/tree/main)*

*As well as documentation by [Matt Pettit](https://github.com/mpettit525)*

## How to use the API Manager
*This covers most use cases. For Amplify specific uses see other notes below as well.*

To make an API call within your React component, you should do the following...

1. Import `useApi` and the Api call function you want to use with the appropriate paths. In the example below, we need to use the `createItems` function for our Api call.
    ```javascript
    import useApi from ".api/hooks/useApi";
    import { createItems } from '.api/axiosApiCalls';
    ```
2. Create the object which will hold the data returned from the Api call and reference other values as needed
    ```javascript
    const param1 = useRef("");
    const [param2, setParam2] = useState("");
    const item = useApi(() => createItems(param1.current.value, param2));
    ```
    * The above code creates an object named *item*.
    * The useApi passes a function. Always use an arrow function which will conatin the Api call function.  In this case, the arrow function contains the Api call function `createItem`, which requires 2 parameters.
        * You can see how these parameters are mapped into the body of the api call in the `.api/axiosApiCalls` file.
    * useApi() returns an object with the following data structure
    ```javascript
    {
        "data": ,
        "error": ,
        "exec": ,
        "isIdle": ,
        "isPending": ,
        "isError": ,
        "isSuccess": ,
    }
    ```
    * The **data** field contains the response from the server.
    * The **error** field contains a String of the error message sent from the server.
    * The **exec** field contains the Api call function which can be used to trigger the Api call.  See example below.
    * The **isIdle** field contains a boolean.  Its value will be True before an Api call is made.
    * The **isPending** field contains a boolean.  Its value will be True while the client waits for the response from the server.  Useful for presenting a *Loading ...* message to the user so they know what is happening.
    * The **isError** field contains a boolean.  Its value will be True if the server returns an error.  Useful to trigger an error message to be displayed.
    * The **isSuccess** field contains a boolean.  Its value will be true if the server returns a response as expected. 
3. Below is an example of how to use the object's boolean fields to display messages to the user.  Using the object created earlier, item, we can access the the fields as shown below.
    * `{item.isIdle ? <p>Idle State</p>: null}`
    * `{item.isPending ? <p>Loading data ...</p> : null}`
    * `{item.isError ? <p>There was a problem</p> : null}`
    * `{item.isSuccess ? <p> Successfully registered</p> : null}`
4. In order to initiate the Api call, use the object.exec function.  Below is an example that ties the onClick of a button to the register.exec function.  When the button is clicked, an Api call to register the user is imitiated.
    ```javascript
    <button
          type="button"
          onClick={item.exec}
        >
          Register
    </button>
    ```
The `object.exec` function can also be called in a useEffect if the call is to occur on page load.

### Configuring Calls

In the `.api/axiosApiCalls` file you can replace and add to the `createItems` example.

For `api.get` and `api.delete` calls, only supply the url (required) and config (optional) as arguments.
For `api.post` and `api.patch` calls, supply the url (required), body (required), and config (optional) as arguments.

### Configuring Enpoint Address

The endpoint address is set in the `./api/axiosApi.ts` file. 

```javascript
// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment or use environment variable
  baseURL: "",
};
```

## Some Useful Notes
* If using `useRef` or `useState` as parameters for an Api call, initialize them with a blank string to avoid an error.
```javascript
const param1 = useRef("")
const [ param2, setParam2 ] = useState("")
const item = useApi(() => createItem(param1.current.value, passwordRef.current.value))
```

## Usage With Amplify
AWS Amplify provides a convenient `RestAPI` class via the `@aws-amplify` package that handles things like rotating credentials. We can implement this API manager on top of their provided class to provide the convenient state management and clean usability.

1. As in the axios example above import the `useApi` hook, but import your API calls from `.api/amplifyRestApiCalls`
    ```javascript
    import useApi from ".api/hooks/useApi";
    import { createItems } from '.api/amplifyRestApiCalls';
    ```
2. All other useage is identical to the above example.

### Configuring Calls

In the `.api/amplifyRestApiCalls` file you can replace and add to the `createItems` example.

You will also want to make sure your `tsconfig.json` (if using typescript) has the `allowJs` option on under `compilerOptions`.
```json
{
  "compilerOptions": {
    "allowJs": true,
  }
}
```
This allows the import of the `aws/exports.js` file. You may have to configure the path to this and change the `apiName` access if you are using more than one API endpoint in amplify.

### Authentication with Cognito

If you are using AWS Cognito authentication make sure your headers are properly configured per the AWS [documentation](https://docs.amplify.aws/lib/restapi/authz/q/platform/js/)