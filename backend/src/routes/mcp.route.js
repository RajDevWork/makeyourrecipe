const express  = require('express')
const { MCPAiRecommendation } = require('../controllers/mcp.controller')
const router = express.Router()

router.post("/",MCPAiRecommendation)

module.exports  = router