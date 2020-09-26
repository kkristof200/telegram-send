# telegram-send

Lightweight package ofrr sending message via telegram

## Install

```bash
npm i telegram-send
```

## Usage

```typescript
import { Telegram } from 'telegram-send'

const tg = new Telegram('token', 'chatID')
tg.send('message')
```
