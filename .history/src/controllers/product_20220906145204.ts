import express from "express";

interface Controller {
    setupRoutes(app: express.Application);
}