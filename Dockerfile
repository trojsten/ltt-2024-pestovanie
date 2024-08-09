FROM oven/bun:latest

WORKDIR /home/bun/app

COPY ./ /home/bun/app

RUN bun install
CMD ["bun", "run", "index.ts"]
