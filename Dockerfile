FROM node:22.17.0-alpine AS builder

RUN corepack enable && corepack prepare yarn@1 --activate

WORKDIR /frontend

COPY package.json /frontend/package.json
COPY yarn.lock /frontend/yarn.lock

RUN yarn install --frozen-lockfile

COPY . /frontend

ENV NODE_ENV=production
RUN yarn build


FROM nginx:1.25-alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY --from=builder /frontend/dist .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
