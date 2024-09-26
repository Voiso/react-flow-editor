FROM node:18.12.0 AS flow-editor-install

WORKDIR /flow-editor
ADD . /flow-editor
RUN npm install -g pnpm@8.14.3
RUN npm install -g vite
RUN pnpm install
EXPOSE 5173

FROM cypress/included:11.2.0 AS cypress
USER nonroot

WORKDIR /flow-editor
COPY --from=flow-editor-install /flow-editor /flow-editor
RUN npm install -g pnpm
ENV UNDER_DOCKER=true
