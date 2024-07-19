FROM node:18-slim

WORKDIR /app
COPY . .
# This will do the trick, use the corresponding env file for each environment.
RUN yarn install
RUN yarn run build

EXPOSE 5173

ENV PORT 5173
ENV HOSTNAME "0.0.0.0"

CMD ["yarn", "run", "dev"]