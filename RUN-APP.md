## When in development, run this:

```docker-compose -f docker-compose.dev.yml up -d --build```

to deport, run this:

```docker-compose -f docker-compose.dev.yml down```

if you want to also delete the volumes:

```docker-compose -f docker-compose.dev.yml down -v```


## When in production, run this:

```docker-compose -f docker-compose.prod.yml up -d --build```

to deport, run this:

```docker-compose -f docker-compose.prod.yml down```

if you want to also delete the volumes:

```docker-compose -f docker-compose.prod.yml down -v```