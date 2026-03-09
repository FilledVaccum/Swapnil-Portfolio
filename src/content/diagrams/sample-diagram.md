---
title: "AWS Event-Driven Architecture"
date: 2026-02-20
tags: [aws, architecture, event-driven]
category: "aws"
draft: false
---

<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="80" width="100" height="40" rx="8" fill="#B07D62" opacity="0.8"/>
  <text x="60" y="105" text-anchor="middle" fill="white" font-size="12">EventBridge</text>
  <rect x="150" y="30" width="100" height="40" rx="8" fill="#7A8B6F" opacity="0.8"/>
  <text x="200" y="55" text-anchor="middle" fill="white" font-size="12">Lambda</text>
  <rect x="150" y="130" width="100" height="40" rx="8" fill="#7A8B6F" opacity="0.8"/>
  <text x="200" y="155" text-anchor="middle" fill="white" font-size="12">SQS</text>
  <rect x="290" y="80" width="100" height="40" rx="8" fill="#5C6B4F" opacity="0.8"/>
  <text x="340" y="105" text-anchor="middle" fill="white" font-size="12">DynamoDB</text>
  <line x1="110" y1="95" x2="150" y2="50" stroke="#D4CBC2" stroke-width="2"/>
  <line x1="110" y1="105" x2="150" y2="150" stroke="#D4CBC2" stroke-width="2"/>
  <line x1="250" y1="50" x2="290" y2="95" stroke="#D4CBC2" stroke-width="2"/>
  <line x1="250" y1="150" x2="290" y2="105" stroke="#D4CBC2" stroke-width="2"/>
</svg>

Sample architecture diagram showing an event-driven flow.
