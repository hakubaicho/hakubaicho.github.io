#! /usr/local/bin/python
# coding: utf-8

import cgi
import datetime
import jquerymobile_templete_engine

#-------------------------------------------------------------------------------
#タイトルの作成
#-------------------------------------------------------------------------------
def create_Title():
    return(u"日付時刻をみよう")

#-------------------------------------------------------------------------------
#ヘッダの作成
#-------------------------------------------------------------------------------
def create_Header():
    return(u"日付時刻をみよう")

#-------------------------------------------------------------------------------
#コンテンツの作成
#-------------------------------------------------------------------------------
def create_Content():

    #---------------------------------------------------
    #入力値処理
    #---------------------------------------------------
    content = u'''
<!--[S] 日付時刻 -->
%s
<!--[E] 日付時刻 -->
'''
    now = datetime.datetime.now()
    content_datetime = "<h1>%4d/%02d/%02d</h1><br/><h2> %02d:%02d:%02d</h2>" % (now.year, now.month, now.day, now.hour, now.minute, now.second)

    content = content % content_datetime

    return(content)

#-------------------------------------------------------------------------------
#フッタの作成
#-------------------------------------------------------------------------------
def create_Footer():
    now = datetime.datetime.now()
    strfooter = "%4d/%02d/%02d %02d:%02d:%02d" % (now.year, now.month, now.day, now.hour, now.minute, now.second)

    return (strfooter)

if __name__ == '__main__':

    #要素の作成
    str_Title   = create_Title()
    str_Header  = create_Header()
    str_Context = create_Content()
    str_Footer  = create_Footer()

    #HTMLファイルの書き出し
    print "Content-type: text/html¥n"
    print (jquerymobile_templete_engine.encodeHtml(str_Title, str_Header, str_Context, str_Footer))


#-------------------------------------------------------------------------------
#一定時間ごとに表示の更新
#-------------------------------------------------------------------------------
##timerreload 
