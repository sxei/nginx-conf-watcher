@echo off
setlocal enabledelayedexpansion
title nginx�����ļ���������v1.1 by lxn
color 0A
mode con: cols=75 lines=30
:: �����ѹ����ʱĿ¼
set tempPath=%cd%
:: ��λ��exe�ļ�������
%~d0
:: ��λ��exe�ļ�����·��
cd %~dp0
node %tempPath%\nginx-conf-watcher.js
pause