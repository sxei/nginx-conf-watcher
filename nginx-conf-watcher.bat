@echo off
setlocal enabledelayedexpansion
title nginx配置文件监听工具v1.1 by lxn
color 0A
mode con: cols=75 lines=30
:: 保存解压的临时目录
set tempPath=%cd%
:: 定位到exe文件所在盘
%~d0
:: 定位到exe文件所在路径
cd %~dp0
node %tempPath%\nginx-conf-watcher.js
pause