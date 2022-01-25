############
############前几天操作失误,导致配置文件重置 配置文件从备份恢复方法: 在设置页面定时设定里增加下面一行，保存后会自动更新,：
############# 22 * * * * bash /root/jd/git_pull.sh >/dev/null 2>&1 
############更新时间为每小时的第22分钟 
############手动恢复:下载putty 登陆后输入 cd config/bak 然后输入 ls 察看最后的config.sh文件备份,如config.sh_2021-9-6-6-23-164 ##然后输入命令：cp ############/root/jd/config/bak/config.sh_2021-9-6-6-23-164 /root/jd/config/config.sh -f 回车即可恢复手动恢复:

添加手机支持,
前几天操作失误,导致config.sh更新,请重置cookie, 并重启设备后即可正常



不要用action跑， 否则github封号，
低调使用，不要fork！尽量第一时间同步更新脚本。
 Action 打开方式 setting--actions ......Actions permissions
.........Allow all actions...save 
docker 一键安装：

wget  https://github.com/hajiuhajiu/jd-shell/raw/v3/install_scripts/docker_install_jd.sh -O docker_install_jd.sh && chmod +x docker_install_jd.sh && bash docker_install_jd.sh

安装完成后输入docker设备地址如192.168.1.1:5678 用户名admin密码admin5678 添加cookie，可进入后扫码获得，自行设定各脚本运行时间即可。




扫码获取ck目前仅仅支持扫码设备与获取二维码设备同ip下才能成功获取否则提示失效!
扫码获取ck目前仅仅支持扫码设备与获取二维码设备同ip下才能成功获取否则提示失效!!
