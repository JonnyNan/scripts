ENV_PATH=
#0622 更新scripts目录wyw
# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /log -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
50 23 */3 * * find /log -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /log/auto_help_collect.log 2>&1

# 更新js脚本和shell脚本，并替换相关参数：
12 12 * * * bash MY_PATH/git_pull.sh >> MY_PATH/log/git_pull.log 2>&1
12 10 * * * bash MY_PATH/pull.sh
# 删除 RmLogDaysAgo 指定天数以前的旧日志，本行为不记录日志：
57 13 * * * bash MY_PATH/rm_log.sh >/dev/null 2>&1

# 导出所有互助码清单，日志在log/export_sharecodes下(可通过面板或者日记查看)：
48 * * * * bash MY_PATH/export_sharecodes.sh
40 * * * *

# 重启挂机脚本：
# 33 13 * * * bash /root/jd/jd.sh hangup
  
# 自定义定时区，添加自己其他想加的定时任务:


# 运行lxk0301大佬的js脚本，仅列出长期任务作初始化用，AutoAddCron=true时，将自动添加短期任务。
# 请保留任务名称中的前缀"jd_"，去掉后缀".js"，如果有些任务你不想运行，注释掉就好了，不要删除。否则会重新添加上。
# 非lxk0301/jd_scripts仓库中的脚本不能以“jd_”、“jr_”、“jx_”开头。请在最后保留一个空行。
0 10 * * * bash /root/jd/jd.sh jd_bean_change
0 10 * * * bash /root/jd/jd.sh jd_bean_change.js >> /log/jd_bean_change.log 2>&1
33 0-23/4 * * * bash /root/jd/jd.sh jd_bean_home.js >> /log/jd_bean_home.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_bean_sign.js >> /log/jd_bean_sign.log 2>&1
1 7,12,19 * * * bash /root/jd/jd.sh jd_beauty.js >> /log/jd_beauty.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_blueCoin.js >> /log/jd_blueCoin.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_blueCoin20.js >> /log/jd_blueCoin20.log 2>&1
7 8,12,18 * * * bash /root/jd/jd.sh jd_bookshop.js >> /log/jd_bookshop.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_car.js >> /log/jd_car.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_car_exchange.js >> /log/jd_car_exchange.log 2>&1
27 6,18,15 * * * bash /root/jd/jd.sh jd_cash.js >> /log/jd_cash.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_cash_exchange.js >> /log/jd_cash_exchange.log 2>&1
30 * * * * bash /root/jd/jd.sh jd_cfd.js >> /log/jd_cfd.log 2>&1
0 0 * * * bash /root/jd/jd.sh jd_club_lottery.js >> /log/jd_club_lottery.log 2>&1
10 7 * * * bash /root/jd/jd.sh jd_crazy_joy.js >> /log/jd_crazy_joy.log 2>&1
1 1 * * * bash /root/jd/jd.sh  jd_crazy_joy_coin.js >> /log/jd_crazy_joy_coin.log 2>&1
18 * * * * bash /root/jd/jd.sh jd_daily_egg.js >> /log/jd_daily_egg.log 2>&1
13 1,22,23 * * * bash /root/jd/jd.sh jd_daily_lottery.js >> /log/jd_daily_lottery.log 2>&1
35 2 * * * bash /root/jd/jd.sh  jd_daydlt.js >> /log/jd_daydlt.log 2>&1
18 1,10 * * * bash /root/jd/jd.sh jd_djjl.js >> /log/jd_djjl.log 2>&1
13 10 * * * bash /root/jd/jd.sh jd_dpqd.js >> /log/jd_dpqd.log 2>&1
8 9 * * * bash /root/jd/jd.sh jd_dpqd2.js >> /log/jd_dpqd2.log 2>&1
20 * * * * bash /root/jd/jd.sh jd_dreamFactory.js >> /log/jd_dreamFactory.log 2>&1
40 3 * * * bash /root/jd/jd.sh  jd_factory.js >> /log/jd_factory.log 2>&1
51 10 * * * bash /root/jd/jd.sh jd_family.js >> /log/jd_family.log 2>&1
45 4 * * * bash /root/jd/jd.sh  jd_fanslove.js >> /log/jd_fanslove.log 2>&1
45 3 * * * bash /root/jd/jd.sh  jd_friend.js >> /log/jd_friend.log 2>&1
5 6-18/6 * * * bash /root/jd/jd.sh jd_fruit.js >> /log/jd_fruit.log 2>&1
47 7 * * * bash /root/jd/jd.sh jd_get_share_code.js >> /log/jd_get_share_code.log 2>&1
38 2 * * * bash /root/jd/jd.sh  jd_getFanslove.js >> /log/jd_getFanslove.log 2>&1
30 * * * * bash /root/jd/jd.sh  jd_half_redrain.js >> /log/jd_half_redrain.log 2>&1
13 1,7,22 * * * bash /root/jd/jd.sh jd_health.js >> /log/jd_health.log 2>&1
5-45/20 * * * * bash /root/jd/jd.sh jd_health_collect.js >> /log/jd_health_collect.log 2>&1
28 2 * * * bash /root/jd/jd.sh  jd_jbczy.js >> /log/jd_jbczy.log 2>&1
30 0,1,2 * * * bash /root/jd/jd.sh jd_jdzz.js >> /log/jd_jdzz.log 2>&1
15 6 * * * bash /root/jd/jd.sh  jd_jintie.js >> /log/jd_jintie.log 2>&1
25 12 * * * bash /root/jd/jd.sh  jd_jintie_wx.js >> /log/jd_jintie_wx.log 2>&1
15 */2 * * * bash /root/jd/jd.sh jd_joy.js >> /log/jd_joy.log 2>&1
15 */1 * * * bash /root/jd/jd.sh jd_joy_feedPets.js >> /log/jd_joy_feedPets.log 2>&1
0 0,8,12,16 * * * bash /root/jd/jd.sh jd_joy_reward.js >> /log/jd_joy_reward.log 2>&1
10 10-20/2 * * * bash /root/jd/jd.sh jd_joy_run.js >> /log/jd_joy_run.log 2>&1
11 2 * * * bash /root/jd/jd.sh  jd_joy_steal.js >> /log/jd_joy_steal.log 2>&1
0 0 * * * bash /root/jd/jd.sh  jd_joy500.js >> /log/jd_joy500.log 2>&1
1 0,11,21 * * * bash /root/jd/jd.sh jd_jump.js >> /log/jd_jump.log 2>&1
38 5 * * * bash /root/jd/jd.sh  jd_jxd.js >> /log/jd_jxd.log 2>&1
8 7 * * * bash /root/jd/jd.sh  jd_jxfactory.js >> /log/jd_jxfactory.log 2>&1
0 6,9,12,18 * * * bash /root/jd/jd.sh jd_jxnc.js >> /log/jd_jxnc.log 2>&1
23 1 * * * bash /root/jd/jd.sh jd_kd.js >> /log/jd_kd.log 2>&1
10-20/5 12 * * * bash /root/jd/jd.sh jd_live.js >> /log/jd_live.log 2>&1
0 3,9,18 * * * bash /root/jd/jd.sh jd_jxlhb.js >> /log/jd_jxlhb.log 2>&1
28 14 * * * bash /root/jd/jd.sh  jd_live_lottery_social.js >> /log/jd_live_lottery_social.log 2>&1
0,30 0-23/1 * * * bash /root/jd/jd.sh jd_live_redrain.js >> /log/jd_live_redrain.log 2>&1
22 0,12,18 * * * bash /root/jd/jd.sh jd_lotteryMachine.js >> /log/jd_lotteryMachine.log 2>&1
38 13 * * * bash /root/jd/jd.sh  jd_market_lottery.js >> /log/jd_market_lottery.log 2>&1
28 15 * * * bash /root/jd/jd.sh  jd_mgold.js >> /log/jd_mgold.log 2>&1
0 */4 * * * bash /root/jd/jd.sh jd_mohe.js >> /log/jd_mohe.log 2>&1
0 */2 * * * bash /root/jd/jd.sh jd_moneyTree.js >> /log/jd_moneyTree.log 2>&1
10 7 * * * bash /root/jd/jd.sh jd_ms.js >> /log/jd_ms.log 2>&1
5 1,10 * * * bash /root/jd/jd.sh  jd_necklace.js >> /log/jd_necklace.log 2>&1
1 16 * * * bash /root/jd/jd.sh  jd_opencard.js >> /log/jd_opencard.log 2>&1
5 6-18/6 * * * bash /root/jd/jd.sh jd_pet.js >> /log/jd_pet.log 2>&1
8 9 * * * bash /root/jd/jd.sh  jd_petTreasureBox.js >> /log/jd_petTreasureBox.log 2>&1
12 * * * * bash /root/jd/jd.sh jd_pigPet.js >> /log/jd_pigPet.log 2>&1
0 */6 * * * bash /root/jd/jd.sh jd_plantBean.js >> /log/jd_plantBean.log 2>&1
8 9 * * * bash /root/jd/jd.sh  jd_plus_bean.js >> /log/jd_plus_bean.log 2>&1
11 9 * * * bash /root/jd/jd.sh jd_rankingList.js >> /log/jd_rankingList.log 2>&1
1 1 * * * bash /root/jd/jd.sh jd_redPacket.js >> /log/jd_redPacket.log 2>&1
27 8 * * * bash /root/jd/jd.sh jd_sgmh.js >> /log/jd_sgmh.log 2>&1
26 5 * * * bash /root/jd/jd.sh  jd_shake.js >> /log/jd_shake.log 2>&1
10 0 * * * bash /root/jd/jd.sh jd_shop.js >> /log/jd_shop.log 2>&1
22 2 * * * bash /root/jd/jd.sh  jd_shop_follow_sku.js >> /log/jd_shop_follow_sku.log 2>&1
12 1 * * * bash /root/jd/jd.sh  jd_shop_lottery.js >> /log/jd_shop_lottery.log 2>&1
58 8 * * * bash /root/jd/jd.sh jd_ShopSign.js >> /log/jd_ShopSign.log 2>&1
16 6,23 * * * bash /root/jd/jd.sh jd_small_home.js >> /log/jd_small_home.log 2>&1
10 0,1 * * * bash /root/jd/jd.sh  jd_speed.js >> /log/jd_speed.log 2>&1
40 0,8 * * * bash /root/jd/jd.sh jd_speed_redpocke.js >> /log/jd_speed_redpocke.log 2>&1
48 0,12,18 * * * bash /root/jd/jd.sh jd_speed_sign.js >> /log/jd_speed_sign.log 2>&1
0 1,21 * * * bash /root/jd/jd.sh jd_star_shop.js >> /log/jd_star_shop.log 2>&1
0 0-23 * * * bash /root/jd/jd.sh  jd_super_redrain.js >> /log/jd_super_redrain.log 2>&1
11 */6 * * * bash /root/jd/jd.sh jd_superMarket.js >> /log/jd_superMarket.log 2>&1
36 0-23/4 * * * bash /root/jd/jd.sh jd_syj.js >> /log/jd_syj.log 2>&1
58 5 * * * bash /root/jd/jd.sh jd_try.js >> /log/jd_try.log 2>&1
38 17 * * * bash /root/jd/jd.sh  jd_unbind.js >> /log/jd_unbind.log 2>&1
15 0-23/4 * * * bash /root/jd/jd.sh jd_unsubscribe.js >> /log/jd_unsubscribe.log 2>&1
1 0 * * * bash /root/jd/jd.sh jx_cfdtx.js >> /log/jx_cfdtx.log 2>&1
18 3 * * * bash /root/jd/jd.sh jx_sign.js >> /log/jx_sign.log 2>&1
0 0-23/1 * * * bash /root/jd/jd.sh jd_super_redrain.js >> /log/jd_super_redrain.log 2>&1
22 3 * * * bash /root/jd/jd.sh jd_tyt.js >> /log/jd_tyt.log 2>&1
#东东电竞经理 格式ok
22 22 * * * bash /root/jd/jd.sh jd_djjl
29 3 * * * bash /root/jd/jd.sh jd_ddo_pk.js >> /log/jd_ddo_pk.log 2>&1
33 6,8 * * * bash /root/jd/jd.sh jd_europeancup.js >> log/jd_europeancup.log 2>&1
13 6,8 * * * bash /root/jd/jd.sh jd_paoku.js >> log/jd_paoku.log 2>&1
23 6,8 * * * bash /root/jd/jd.sh jd_qqxing.js >> log/jd_qqxing.log 2>&1
15 0-23/4 * * * bash /root/jd/jd.sh jd_jxmc.js >> /log/jd_jxmc.log 2>&1
18 0-23/4 * * * bash /root/jd/jd.sh jd_jxmc
29 4 * * * bash /root/jd/jd.sh jd_ddnc_farmpark.js >> /log/jd_ddnc_farmpark.log 2>&1
