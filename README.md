# builder-bob
Yet another builder app. Install this globally and you'll have access to the `bob` command anywhere on your system.

# NOTE:
Make it so that if a build job is running, it MUST complete before allowing another to run. This is because of file contention issues. So make a combo throttle/debouncer to wait until previous job is complete before allowing the latest request.

```shell
npm install -g git+https://gitlab.com/lucentminds/builder-bob.git
```

## How the CLI works
Each time __bob__ is run, it applies the configuration from your `bobfile.js`, and executes any tasks you've requested for it to run. If you have multiple bobfiles, then it will look at them in alphabetical order.

## Example bobfile
```js
module.exports = function( bob ) {
        
    var oBuild = bob.createJob( 'task' );

    // Do this first.
    oBuild.addTask( 'empty', {
        enabled: false,
        dirs: [
            "./build",
            "./temp"
        ]
    });

    // Do this second.
    oBuild.addTask( 'copy', {
        name: "Copy php files to build",
        enabled: true,
        files: [
            {
                "src": "./src/startexperience.php",
                "dest": "./build/startexperience.php"
            }
        ]
    });
};// /exports()
```

or this does the same thing.

```js
module.exports = function( bob ) {
        
    var oBuild = bob.createJob( 'task' );

    oBuild.setTasks([
        // Do this first.
        {
            task: 'empty',
            enabled: false,
            dirs: [
                "./build",
                "./temp"
            ]
        },
        
        // Do this second.
        {
            task: 'copy',
            name: "Copy php files to build",
            enabled: true,
            files: [
                {
                    "src": "./src/startexperience.php",
                    "dest": "./build/startexperience.php"
                }
            ]
        }
    ]);
};// /exports()
```