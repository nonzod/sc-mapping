# Start with systemd

install nvm

change service file with your data

```
User=nodejs
WorkingDirectory=/path/to/sc-mapping
ExecStart=/path/to/.nvm/nvm-exec node ./server/index.mjs
```


```bash
systemctl daemon-reload
systemctl start sc-mapping.service 
systemctl enable sc-mapping.service 
```

🤮 Systemd merda