FROM alpine:latest

RUN apk update && apk add --no-cache \
    git \
    curl \
    jq \
    openssh

COPY create_pr.sh /create_pr.sh
RUN chmod +x /create_pr.sh

ENV GITHUB_SECRET_KEY=${GITHUB_SECRET_KEY}
ENV GITHUB_USER_NAME=${GITHUB_USER_NAME}
ENV GITHUB_USER_EMAIL=${GITHUB_USER_EMAIL}

ENTRYPOINT ["/create_pr.sh"]
