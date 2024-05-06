FROM node:16.14.0 as flow-editor-install

WORKDIR /flow-editor
ADD . /flow-editor
RUN npm install -g pnpm
RUN npm install -g vite
RUN pnpm install
EXPOSE 5173

FROM cypress/included:11.2.0 as cypress

WORKDIR /flow-editor
COPY --from=flow-editor-install /flow-editor /flow-editor
RUN npm install -g pnpm
ENV UNDER_DOCKER=true
