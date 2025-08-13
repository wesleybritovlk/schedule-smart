# Stage 1: Build
FROM maven:3-eclipse-temurin-21-alpine AS build
WORKDIR /build
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Final Image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN apk update && apk upgrade && apk add --no-cache curl
COPY entrypoint.sh /app/entrypoint.sh
RUN sed -i 's/\r$//' /app/entrypoint.sh && chmod +x /app/entrypoint.sh
COPY --from=build /build/target/schedulesmart*.jar /app/app.jar
LABEL maintainer="Wesley Brito <wesley.brito@evig.com.br>"
EXPOSE 8080
ENTRYPOINT ["/app/entrypoint.sh"]
