import { Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class ThePredictiveLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // ======================================================================
    /**
     * The Lambda function that will be called by the API Gateway
     */
    const PredictiveLambda = new lambda.DockerImageFunction(
      this,
      "PredictiveLambda",
      {
        code: lambda.DockerImageCode.fromImageAsset("model"),
        memorySize: 4096,
        timeout: cdk.Duration.seconds(10),
      }
    );

    // ======================================================================
    /**
     * The API Gateway that will be used to call the Lambda function
     * Defines an API Gateway REST API with AWS Lambda proxy integration
     */
    const api = new apigateway.LambdaRestApi(this, "PredictiveAPI", {
      handler: PredictiveLambda,
      // An integration to use as a default for all methods created within this API unless an integration is specified.
      defaultIntegration: new apigateway.LambdaIntegration(PredictiveLambda), // Integrates an AWS Lambda function to an API Gateway method.
    });

    // ======================================================================
    /**
     * Creates an CfnOutput value for this stack
     * This is used to create an output in the CDK app
     */
    new cdk.CfnOutput(this, "PredictiveAPIURL", {
      value: api.url,
    });
  }
}
