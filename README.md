# Mini Events API

## Setup (Development)

```bash
    git clone <git-repository-url>
    cd <project>
    # then run:
    bash setup.sh # or
    # if you get permission denied error run:
    sudo bash setup.sh 
    # if you don't preffer running .sh files you can run:
    npm install
    npm run db:create
    npm run db:migrate
    npm run db:seed
```

`Note: Make sure to rename APP_KEYS_SAMPLE.ts module to APP_KEYS.ts and add your env variables there`