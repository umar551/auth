
Role Base system
ROLE AND PERMISSION
Authentication JWT
Generic Response
Refresh token
Hashing password
DB#tables

SELECT `roles`.`id`,
    `roles`.`name`,
    `roles`.`createdAt`,
    `roles`.`updatedAt`,
    `roles`.`isDeleted`
FROM `roledb`.`roles`;


SELECT `users`.`id`,
    `users`.`name`,
    `users`.`email`,
    `users`.`password`,
    `users`.`phone`,
    `users`.`refreshToken`,
    `users`.`tokenExpire`,
    `users`.`roleId`,
    `users`.`createdAt`,
    `users`.`updatedAt`,
    `users`.`isDeleted`
FROM `roledb`.`users`;

SELECT `permissions`.`id`,
    `permissions`.`name`,
    `permissions`.`description`,
    `permissions`.`createdAt`,
    `permissions`.`updatedAt`,
    `permissions`.`isDeleted`
FROM `roledb`.`permissions`;


SELECT `rolepermission`.`id`,
    `rolepermission`.`roleId`,
    `rolepermission`.`permissionId`,
    `rolepermission`.`createdAt`,
    `rolepermission`.`updatedAt`,
    `rolepermission`.`isDeleted`
FROM `roledb`.`rolepermission`;
