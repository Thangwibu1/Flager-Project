/**
 * @openapi
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       required:
 *         - data
 *       properties:
 *         data:
 *           $ref: '#/components/schemas/LoginResponseData'
 *
 *     LoginResponseData:
 *       type: object
 *       required:
 *         - accessToken
 *       properties:
 *         accessToken:
 *           type: string
 *           example: asdfhpasidasdfas8d9f987asfdjns
 */