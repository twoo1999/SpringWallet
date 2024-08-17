FROM openjdk:17-jdk-slim AS build
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/spring-wallet-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
