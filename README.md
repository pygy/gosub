# gosub

You want to use pkg.scripts subtasks, but you don't want to commit to either `npm run` or `yarn run`? Look no further.

Given the following `package.json`

```JSON
{
  "name": "my-package",
  "version": "1.0.0",
  "license": "MIT",
  "scripts": {
    "task": "gosub subtask && gosub print done",
    "subtask": "echo ====>> unix: $npm_config_user_agent win: %npm_config_user_agent% <<====",
    "print":"echo"
  },
  "devDependencies": {
    "gosub": "1.0.0"
  }
}
```

After running `npm install` or `yarn` you get the following:

```BASH
~/tmp ❯❯❯ yarn run --silent task
$ echo "====>> $npm_config_user_agent <<===="
====>> yarn/1.3.2 npm/? node/v8.9.1 darwin x64 <<====
$ echo done
done
```

and

```BASH
~/tmp ❯❯❯ npm run --silent task
====>> npm/5.5.1 node/v8.9.1 darwin x64 <<====
done
```

In other words, if the main task is launched with `npm run` the sub tasks will be as well. If you launched it with `yarn run`, so will the subtasks (look between the `===>>` arrows `<<====` ).

This makes your `pkg.scripts` runner agnostic.

## What about other commands beyond `run`?

You can use `gosub --raw action`. So `gosub --raw install` will run `npm install` (re. `bun`, `yarn`, etc...).

## Why not use `$_ run subtask`?

It doesn't work on Windows (although it will save you tens if not hundreds of milliseconds on *nix). If it turns out there's a native, cross-platform method to achieve what `gosub` does please chime in in the issues.

## Caveat

The script works for my own use, but I'm not used to writing command line utilities and may have botched up some details that matter for your use case. For example, this has only been tested on MacOS, althought AFAICT there's nothing OS specific in the script. Feel free to open an issue if you have problems and/or suggestions.

## Is `gosub` a BASIC thing?

\*Waves at all of you who learned to code on 8/16 bits computers\*.

## History

### v2.0.0

- Add a `--raw` option to launch other commands `gosub --raw install` will launch `npm install` (or `bun`, `yarn` depending on what you're using) .

### v1.1.0

- Use `child_process.spawn` instead of `.exec` to prevent the parent from exiting early.
- Have the child inherit the `stdio` streams rather than piping them manually.
- Also pipe `stdin` to the children processes.

### v1.0.0

initial release

## License?

Romantic WTF!