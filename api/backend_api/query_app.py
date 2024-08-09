############################################################
#____________________ALL IMPORT SECTION____________________#
############################################################
from flask import Blueprint, render_template, session,abort
import flask
import os
import sys
import requests
import json
import re
import glob
import subprocess
import datetime
import graphviz
import platform
import dateutil.parser
import decimal
import pm4py
import statistics
import ast
import pyodbc
import psycopg2
import sqlvalidator
import pandas as pd
from flask_oidc import OpenIDConnect
from flask_cors import CORS
from flask import Flask,redirect
from keycloak import KeycloakOpenID
from graphviz import Digraph
from flask import request, jsonify, render_template, redirect, send_file
from pm4py.algo.filtering.log.attributes import attributes_filter
from distutils.command.build_scripts import first_line_re
from jinja2 import Undefined
from collections import Counter
from multiprocessing import Process
from time import sleep
from os.path import exists
from pm4py.objects.log.importer.xes import importer as xes_importer
from pm4py.algo.discovery.dfg import algorithm as dfg_discovery
from pm4py.visualization.dfg import visualizer as dfg_visualization
from pm4py.objects.dfg.filtering import dfg_filtering
from pm4py.algo.discovery.inductive import algorithm as inductive_miner
from pm4py.visualization.petri_net import visualizer as pn_visualizer
from pm4py.objects.conversion.process_tree import converter
from pm4py.algo.filtering.log.start_activities import start_activities_filter
from pm4py.algo.filtering.log.end_activities import end_activities_filter
from pm4py.algo.discovery.footprints import algorithm as footprints_discovery
from pm4py.objects.log.util import interval_lifecycle
from pm4py.algo.filtering.log.variants import variants_filter
from pm4py.util import constants
from pm4py.statistics.traces.generic.log import case_statistics
from pm4py.algo.organizational_mining.resource_profiles import algorithm
from pm4py.algo.discovery.temporal_profile import algorithm as temporal_profile_discovery
from pm4py.objects.log.exporter.xes import exporter as xes_exporter
sys.path.insert(1, 'database')
sys.path.insert(2, 'rule_filter')
sys.path.insert(3, 'backend_api')
from databaseFunctions import *
from utilities import *
from rule import *

import databaseFunctions

from backend_classes import *

############################################################
#________________________QUERY API_________________________#
############################################################

with open('../properties.txt') as f:
    lines = f.readlines()
    frontend = lines[0]
    frontend = frontend.split(': ')
    http = frontend[1]
    frontend = frontend[1]
    frontend = frontend.split('//')
    path_f = frontend[1].split(':')[0]
    port_f = frontend[1].split(':')[1]
    port_f = port_f.split('/')[0]
f.close()


app_query = Blueprint('app_query',__name__)

def process_string(input_string):
    split_string = input_string.split("api/", 1)
    if len(split_string) > 1:
        result = split_string[1]
        return result
    else:
        if(input_string.startswith("/storage")):
            return input_string[1:]
        else:
            return input_string
            

@app_query.route('/queryDb', methods=['GET', 'POST'])
def queryDb():
    
    #global log_path
    #global databaseName
    # print(session["databaseName"])
    # print(session["log_path"])
    #databaseName="TestDB"
    #databaseName="datacloud"
    #runningXesPath=session["log_path"]
    

    # Print the current working directory
    working_dir=os.getcwd()
    print("Current working directory: {0}".format(os.getcwd()))
    
    #os.chdir(working_dir+'/queryJar')

    #os.system("java -jar XesToRxesPlus.jar "+databaseName+" "+runningXesPath)
    #os.system("java -jar XesToRxesPlus_PostgresDocker.jar "+session["databaseName"]+" "+runningXesPath)
    #print("  \n")
    
    if (path_f=="0.0.0.0"):
        db_data_jar_path=process_string(session["database_jar"]+"/XesToRxesPlus_PostgresDocker.jar")
        if(db_data_jar_path[0]=="/"):
            print("start database jar path")
            db_data_jar_path=process_string(session["database_jar"]+"/XesToRxesPlus_PostgresDocker.jar")[1:]

        runningXesPath=process_string(session["directory_log"]+"/"+session["log_name"])
        if(runningXesPath[0]=="/"):
            print("start xes path")
            runningXesPath=process_string(session["directory_log"]+"/"+session["log_name"])[1:]

        db_data_jar = subprocess.Popen( "java -jar " + db_data_jar_path +" "+session["databaseName"]+" "+runningXesPath+" "+"'"+databaseFunctions.URL_DATABASE+"/"+session["databaseName"]+"?user="+databaseFunctions.usernameDB+"&password="+databaseFunctions.passwordDB+"'", shell=True)
    else:
        db_data_jar_path=process_string(session["database_jar"]+"/XesToRxesPlus_Postgres.jar")
        if(db_data_jar_path[0]=="/"):
            print("start database jar path")
            db_data_jar_path=process_string(session["database_jar"]+"/XesToRxesPlus_Postgres.jar")[1:]

        runningXesPath=process_string(session["directory_log"]+"/"+session["log_name"])
        if(runningXesPath[0]=="/"):
            print("start xes path")
            runningXesPath=process_string(session["directory_log"]+"/"+session["log_name"])[1:]    

        db_data_jar = subprocess.Popen( "java -jar " + db_data_jar_path +" "+session["databaseName"]+" "+runningXesPath, shell=True)


    session["pid_database"]=db_data_jar.pid

    try:
        print('Running in process', session["pid_database"])
        db_data_jar.wait()    
    except subprocess.TimeoutExpired:
        print('Timed out - killing', session["pid_database"])
        #process_jar.kill()
        os.kill(session["pid_database"], signal.SIGKILL) #or signal.SIGKILL     
    print("\njar database done")
    
    #os.chdir(working_dir)

    return "query_done"

@app_query.route('/initializeQuery', methods=['GET', 'POST'])
def initializeQuery():
    queryPercentage = str(request.args.get('queryPercentage'))
    #server = 'localhost' 
    #port= '5432'
    #database = 'TestDB'
    #global databaseName
    #database = 'datacloud' 
    #username = 'sa'
    #username = 'postgres' 
    #password = 'ubuntu-777' 
    #cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    #cnxn = pyodbc.connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server='+server+';Database='+database+';User ID='+username+';Password='+password+';String Types=Unicode')
    
    #establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"], user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
    )


    cursor = cnxn.cursor()

    ##Sample select query DROP TABLE IF EXISTS log;
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute("select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db \
                    from attribute a, event e, event_has_attribute eha \
                    where e.id=eha.event_id and a.id=eha.attr_id") 
    cursor.close()

    cursor1 = cnxn.cursor()
    cursor1.execute("select distinct a1.trace_id, a1.event_name, a2.event_name \
                from log_db a1, log_db a2 \
                where a1.trace_id=a2.trace_id and a1.event_name!=a2.event_name and (EXTRACT(EPOCH from a1.time::timestamp)-EXTRACT(EPOCH from a2.time::timestamp))>"+queryPercentage) 

    response=""
    row = cursor1.fetchone() 
    while row: 
        response=response+str(row)+"\n"
        row = cursor1.fetchone()

    cursor1.close()
    cnxn.close()

    return response

@app_query.route('/makeQuery', methods=['GET', 'POST'])
def makeQuery():
    
    queryTODO = str(request.args.get('query'))
    querySELECT = str(request.args.get("selectpart"))


    if("select *" in querySELECT):
        querySELECT="trace_id, event_name, time, key, value"
    else:
        querySELECT = querySELECT.replace("select distinct ","")
        querySELECT = querySELECT.replace("select ","")

    #database = 'TestDB'
    #global databaseName
    #database = 'datacloud' 
    #username = 'sa'

    #cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    #cnxn = pyodbc.connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server='+server+';Database='+database+';User ID='+username+';Password='+password+';String Types=Unicode')
    
    #establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"], user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
    )


    cursor = cnxn.cursor()

    #sample select query DROP TABLE IF EXISTS log;
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute("select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db \
                    from attribute a, event e, event_has_attribute eha \
                    where e.id=eha.event_id and a.id=eha.attr_id") 
    cursor.close()

 

    if (("delete" in queryTODO) or ("drop" in queryTODO) or ("insert" in queryTODO)):
        return "errore,sql"+"£"+"errore,sql"

      
    print("############")
    print(queryTODO)
    print("############")

    sql_query = sqlvalidator.parse(queryTODO)
    if not sql_query.is_valid():
        print(sql_query.errors)
        return "errore,query"+"£"+"errore,query"
    else:
        try:
            cursor1 = cnxn.cursor()
            cursor1.execute(queryTODO) 

            response=""
            row = cursor1.fetchone() 
            while row: 
            
                for a in row:
                    if(isinstance(a, datetime.datetime)):
                        response=response+a.strftime("%d/%m/%Y %H:%M:%S")+","
                    else:
                        response=response+str(a)+","
                response=response[:-1]+"\n"

                #response=response+str(row)+"\n"
                row = cursor1.fetchone()

            cursor1.close()
            cnxn.close()
        except Exception as e:
            # Handle the exception
            print("An error occurred:", str(e))
            # Return an appropriate error message or value
            return "errore,query"+"£"+"errore,query"

    return response+"£"+querySELECT

@app_query.route('/makeQueryLibera', methods=['GET', 'POST'])
def makeQueryLibera():
    
    queryTODO = str(request.args.get('query'))
    querySELECT = str(request.args.get("selectpart"))

    if("select *" in querySELECT):
        querySELECT="trace_id, event_name, time, key, value"
    else:
        querySELECT = querySELECT.replace("select distinct ","")
        querySELECT = querySELECT.replace("select ","")

    #database = 'TestDB'
    #global databaseName
    #database = 'datacloud' 
    #username = 'sa'

    #cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    #cnxn = pyodbc.connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server='+server+';Database='+database+';User ID='+username+';Password='+password+';String Types=Unicode')
    
    #establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"], user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
    )


    cursor = cnxn.cursor()

    #sample select query DROP TABLE IF EXISTS log;
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute("select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db \
                    from attribute a, event e, event_has_attribute eha \
                    where e.id=eha.event_id and a.id=eha.attr_id") 
    cursor.close()


    cursor1 = cnxn.cursor()
    cursor1.execute("DROP TABLE IF EXISTS translated_log_db CASCADE;");
    cursor1.execute("select distinct  log1.trace_id, log1.event_name, log1.time, log1.key, log1.value into translated_log_db \
                     from log_db log1 ;")
    cursor1.close()

 

    if (("delete" in queryTODO) or ("drop" in queryTODO) or ("insert" in queryTODO)):
        return "errore,sql"+"£"+"errore,sql"

      
    print("############")
    print(queryTODO)
    print("############")

    sql_query = sqlvalidator.parse(queryTODO)
    if not sql_query.is_valid():
        print(sql_query.errors)
        return "errore,query"+"£"+"errore,query"
    else:
        try:
            cursor1 = cnxn.cursor()
            cursor1.execute(queryTODO) 

            response=""
            row = cursor1.fetchone() 
            while row: 
            
                for a in row:
                    if(isinstance(a, datetime.datetime)):
                        response=response+a.strftime("%d/%m/%Y %H:%M:%S")+","
                    else:
                        response=response+str(a)+","
                response=response[:-1]+"\n"

                #response=response+str(row)+"\n"
                row = cursor1.fetchone()

            cursor1.close()
            cnxn.close()
        except Exception as e:
            # Handle the exception
            print("An error occurred:", str(e))
            # Return an appropriate error message or value
            return "errore,query"+"£"+"errore,query"

    return response+"£"+querySELECT

'''
@app_query.route('/doQuery1', methods=['GET', 'POST'])
def doQuery1():
    
    #queryTODO = str(request.args.get('query'))
    #querySELECT = str(request.args.get("selectpart"))
    #querySELECT = querySELECT.replace("select distinct ","")

    #database = 'TestDB'
    #global databaseName
    #database = 'datacloud' 
    #username = 'sa'
    #cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    #cnxn = pyodbc.connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server='+server+';Database='+database+';User ID='+username+';Password='+password+';String Types=Unicode')
    
    
    #establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"],user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
    )


    cursor = cnxn.cursor()
    #sample select query DROP TABLE IF EXISTS log;
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute("select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db \
                    from attribute a, event e, event_has_attribute eha \
                    where e.id=eha.event_id and a.id=eha.attr_id") 
    cursor.close()

    
    cursor1 = cnxn.cursor()
    cursor1.execute("DROP TABLE IF EXISTS translated_log_db CASCADE;");
    cursor1.execute("select distinct  log1.trace_id, log1.event_name, log1.time, log1.key, log1.value into translated_log_db \
                     from log_db log1 ;")
    cursor1.close()


    cursor2 = cnxn.cursor()
    cursor2.execute("select distinct nldb1.event_name, nldb1.key, nldb1.value \
                     from translated_log_db nldb1 \
                     where key='DataSourceName' and NOT EXISTS( \
                         select * \
                         from translated_log_db nldb2 \
                         where nldb1.event_name=nldb2.event_name and ((nldb2.key='DataSourceType' and nldb2.value='Input') or (nldb2.key='DataSourceType' and nldb2.value='Both')) \
                     )")



    response=""
    row = cursor2.fetchone() 
    while row: 
        for a in row:
            if(isinstance(a, datetime.datetime)):
                response=response+a.strftime("%d/%m/%Y %H:%M:%S")+","
            else:
                response=response+str(a)+","
        response=response[:-1]+"\n"

        #response=response+str(row)+"\n"
        row = cursor2.fetchone()

    cursor2.close()
    cnxn.close()

    print(response)
    querySELECT="nldb1.event_name, nldb1.key, nldb1.value"

    return response+"£"+querySELECT
'''
def extract_select_part(sql_query):
    pattern = re.compile(r'(SELECT\s+[\s\S]*?)\s+(FROM|WHERE|GROUP BY|ORDER BY|HAVING|LIMIT|;)', re.IGNORECASE)
    
    match = pattern.search(sql_query)
    
    if match:
        return match.group(1).strip()
    else:
        return None


@app_query.route('/doQuery1', methods=['GET', 'POST'])
def doQuery1():
    # Establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"],
        user=databaseFunctions.usernameDB,
        password=databaseFunctions.passwordDB,
        host=databaseFunctions.serverDB,
        port=databaseFunctions.portDB
    )

    cursor = cnxn.cursor()
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute(
        "select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db "
        "from attribute a, event e, event_has_attribute eha "
        "where e.id=eha.event_id and a.id=eha.attr_id"
    )
    cursor.close()

    cursor1 = cnxn.cursor()
    cursor1.execute("DROP TABLE IF EXISTS translated_log_db CASCADE;")
    cursor1.execute(
        "select distinct log1.trace_id, log1.event_name, log1.time, log1.key, log1.value into translated_log_db "
        "from log_db log1 ;"
    )
    cursor1.close()

    # Read the SQL query from the file
    with open(process_string('api/query/query1script.sql'), 'r') as file:
        query = file.read()

    sql_query1 = sqlvalidator.parse(query)
    if not sql_query1.is_valid():
        print(sql_query1.errors)
        return "errore,query"+"£"+"errore,query"
    
    cursor2 = cnxn.cursor()
    cursor2.execute(query)

    response = ""
    row = cursor2.fetchone()
    while row:
        for a in row:
            if isinstance(a, datetime.datetime):
                response += a.strftime("%d/%m/%Y %H:%M:%S") + ","
            else:
                response += str(a) + ","
        response = response[:-1] + "\n"
        row = cursor2.fetchone()

    cursor2.close()
    cnxn.close()

    print(response)
    querySELECT = extract_select_part(query)
    if("select *" in querySELECT):
        querySELECT="trace_id, event_name, time, key, value"
    else:
        querySELECT = querySELECT.replace("select distinct ","")
        querySELECT = querySELECT.replace("select ","")


    return response + "£" + querySELECT

@app_query.route('/doPersonalizedQuery/<int:id>', methods=['GET', 'POST'])
def doPersonalizedQuery(id):
    try:
        # Establishing the connection
        cnxn = psycopg2.connect(
            database=session["databaseName"],
            user=databaseFunctions.usernameDB,
            password=databaseFunctions.passwordDB,
            host=databaseFunctions.serverDB,
            port=databaseFunctions.portDB
        )

        # Dropping and recreating the log_db table
        with cnxn.cursor() as cursor:
            cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
            cursor.execute(
                "SELECT e.trace_id, e.name AS event_name, e.time, a.key, eha.value INTO log_db "
                "FROM attribute a, event e, event_has_attribute eha "
                "WHERE e.id = eha.event_id AND a.id = eha.attr_id"
            )

        # Dropping and recreating the translated_log_db table
        with cnxn.cursor() as cursor1:
            cursor1.execute("DROP TABLE IF EXISTS translated_log_db CASCADE;")
            cursor1.execute(
                "SELECT DISTINCT log1.trace_id, log1.event_name, log1.time, log1.key, log1.value INTO translated_log_db "
                "FROM log_db log1;"
            )

        # Read the SQL query from the file corresponding to the provided id
        query_file_path = process_string(f'api/query_personalized/query_{id}.sql')
        with open(query_file_path, 'r') as file:
            query = file.read()

        # Validate the SQL query
        sql_query1 = sqlvalidator.parse(query)
        if not sql_query1.is_valid():
            print(sql_query1.errors)
            return "error,query" + "£" + "error,query"

        # Execute the query and fetch the results
        response = ""
        with cnxn.cursor() as cursor2:
            cursor2.execute(query)
            row = cursor2.fetchone()
            while row:
                response += ",".join(
                    a.strftime("%d/%m/%Y %H:%M:%S") if isinstance(a, datetime.datetime) else str(a)
                    for a in row
                ) + "\n"
                row = cursor2.fetchone()

        # Extract the SELECT part of the query
        querySELECT = extract_select_part(query)
        if "select *" in querySELECT:
            querySELECT = "trace_id, event_name, time, key, value"
        else:
            querySELECT = querySELECT.replace("select distinct ", "").replace("select ", "")

        # Close the connection
        cnxn.close()

        # Return the response along with the selected fields
        return response + "£" + querySELECT

    except Exception as e:
        return str(e), 500



@app_query.route('/readEditPersonalizedQuery/<int:id>', methods=['GET'])
def readPersonalizedEdit_file(id):
    try:
        description_file = process_string(f'api/query_personalized/description_{id}.txt')
        script_file = process_string(f'api/query_personalized/query_{id}.sql')
        
        with open(description_file, 'r') as file1:
            content1 = file1.read()
        
        with open(script_file, 'r') as file2:
            content2 = file2.read()
        
        return jsonify({'content1': content1, 'content2': content2})
    
    except Exception as e:
        return jsonify({'error': str(e)})



@app_query.route('/readDescriptionQuery1', methods=['GET'])
def read_file():
    try:
        with open(process_string('api/query/query1description.txt'), 'r') as file:
            content = file.read()
        return jsonify({'content': content})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app_query.route('/readDescriptionPersonalizedQuery/<int:id>', methods=['GET'])
def readPersonalized_file(id):
    try:
        description_file = process_string(f'api/query_personalized/description_{id}.txt')
        
        with open(description_file, 'r') as file:
            content = file.read()
        
        return jsonify({'content': content})
    except Exception as e:
        return jsonify({'error': str(e)})

    
@app_query.route('/readEditQuery1', methods=['GET'])
def readEdit_file():
    try:
        with open(process_string('api/query/query1description.txt'), 'r') as file1:
            content1 = file1.read()
        
        with open(process_string('api/query/query1script.sql'), 'r') as file2:
            content2 = file2.read()
        
        return jsonify({'content1': content1, 'content2': content2})
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app_query.route('/updateQuery1', methods=['POST'])
def update_query1():
    try:
        data = request.json
        description = data['description']
        query = data['query']

        with open(process_string('api/query/query1description.txt'), 'w') as desc_file:
            desc_file.write(description)

        with open(process_string('api/query/query1script.sql'), 'w') as query_file:
            query_file.write(query)

        return jsonify({'message': 'Query updated successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app_query.route('/updatePersonalizedQuery/<int:id>', methods=['POST'])
def update_query(id):
    try:
        data = request.json
        description = data['description']
        query = data['query']

        description_file = process_string(f'api/query_personalized/description_{id}.txt')
        query_file = process_string(f'api/query_personalized/query_{id}.sql')

        with open(description_file, 'w') as desc_file:
            desc_file.write(description)

        with open(query_file, 'w') as query_file:
            query_file.write(query)

        return jsonify({'message': 'Query updated successfully!'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app_query.route('/getQueriesAndDescriptions', methods=['GET'])
def get_queries_and_descriptions():
    try:
        folder_path = process_string('api/query_personalized')  # Update with the correct folder path
        files = os.listdir(folder_path)
        queries_and_descriptions = []

        # Filter and sort files to pair them correctly
        queries = sorted([f for f in files if f.startswith('query_') and f.endswith('.sql')])
        descriptions = sorted([f for f in files if f.startswith('description_') and f.endswith('.txt')])

        for query_file, desc_file in zip(queries, descriptions):
            with open(os.path.join(folder_path, query_file), 'r') as qf:
                query_content = qf.read()
            with open(os.path.join(folder_path, desc_file), 'r') as df:
                description_content = df.read()

            queries_and_descriptions.append({
                'id': query_file.replace('query_', '').replace('.sql', ''),  # Extract the id
                'query': query_content,
                'description': description_content
            })

        return jsonify(queries_and_descriptions)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app_query.route('/doQuery2', methods=['GET', 'POST'])
def doQuery2():
    
    #queryTODO = str(request.args.get('query'))
    #querySELECT = str(request.args.get("selectpart"))
    #querySELECT = querySELECT.replace("select distinct ","")

    #database = 'TestDB'
    #global databaseName
    #database = 'datacloud' 
    #username = 'sa'
    #cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    #cnxn = pyodbc.connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server='+server+';Database='+database+';User ID='+username+';Password='+password+';String Types=Unicode')
    
    
    #establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"], user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
    )


    cursor = cnxn.cursor()
    #sample select query DROP TABLE IF EXISTS log;
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute("select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db \
                    from attribute a, event e, event_has_attribute eha \
                    where e.id=eha.event_id and a.id=eha.attr_id") 
    cursor.close()

    
    cursor1 = cnxn.cursor()
    cursor1.execute("DROP TABLE IF EXISTS translated_log_db CASCADE;");
    cursor1.execute("select distinct  log1.trace_id, log1.event_name, log1.time, log1.key, log1.value into translated_log_db \
                     from log_db log1 ;")
    cursor1.close()


    cursor2_1 = cnxn.cursor()
    cursor2_1.execute("DROP TABLE IF EXISTS dsname CASCADE;")
    cursor2_1.execute("select nldb1.event_name, nldb1.key, nldb1.value into dsname \
                        from translated_log_db nldb1 \
                        where key='DataSourceName' and EXISTS( \
                            select * \
                            from translated_log_db nldb2 \
                            where nldb1.event_name=nldb2.event_name and nldb2.key='StepContinuumLayer' and nldb2.value='Cloud' \
                        ) and NOT EXISTS ( \
                            select * \
                            from translated_log_db nldb3 \
                            where nldb1.event_name=nldb3.event_name and ((nldb3.key='DataSourceType' and nldb3.value='Input') or (nldb3.key='DataSourceType' and nldb3.value='Both')) \
                        );")
    cursor2_1.close()


    cursor2_2 = cnxn.cursor()
    cursor2_2.execute("DROP TABLE IF EXISTS dsvolume CASCADE;")
    cursor2_2.execute("select nldb1.event_name, nldb1.key, nldb1.value into dsvolume \
                     from translated_log_db nldb1 \
                     where key='DataSourceVolume' and EXISTS( \
                         select * \
                         from translated_log_db nldb2 \
                         where nldb1.event_name=nldb2.event_name and nldb2.key='StepContinuumLayer' and nldb2.value='Cloud' \
                     ) and NOT EXISTS ( \
                         select * \
                         from translated_log_db nldb3 \
                         where nldb1.event_name=nldb3.event_name and ((nldb3.key='DataSourceType' and nldb3.value='Input') or (nldb3.key='DataSourceType' and nldb3.value='Both')) \
                     );")
    cursor2_2.close()

    cursor3 = cnxn.cursor()
    cursor3.execute("select distinct dsname.key, dsname.value, dsvolume.key, dsvolume.value \
                     from dsname, dsvolume \
                     where dsname.event_name = dsvolume.event_name;")



    response=""
    row = cursor3.fetchone() 
    while row: 
        for a in row:
            if(isinstance(a, datetime.datetime)):
                response=response+a.strftime("%d/%m/%Y %H:%M:%S")+","
            else:
                response=response+str(a)+","
        response=response[:-1]+"\n"

        #response=response+str(row)+"\n"
        row = cursor3.fetchone()

    cursor3.close()
    cnxn.close()

    print(response)
    querySELECT="dsname.key, dsname.value, dsvolume.key, dsvolume.value"

    return response+"£"+querySELECT



def get_current_id():
    try:
        with open(process_string('api/query_id/query_id.txt'), 'r') as f:
            return int(f.read().strip())
    except FileNotFoundError:
        return 1  # Start from 1 if the file doesn't exist

# Function to update the query ID
def increment_id(current_id):
    with open(process_string('api/query_id/query_id.txt'), 'w') as f:
        f.write(str(current_id + 1))

@app_query.route('/saveQuery', methods=['POST'])
def save_query():
    data = request.json
    description = data.get('description')
    query = data.get('query')

    try:
        # Get current query ID
        current_id = get_current_id()

        # Save description to a file with the current ID
        description_filename = process_string('api/query_personalized/description_'+str(current_id)+'.txt')
        with open(description_filename, 'w') as desc_file:
            desc_file.write(description)

        # Save query to a file with the current ID
        query_filename = process_string('api/query_personalized/query_'+str(current_id)+'.sql')
        with open(query_filename, 'w') as query_file:
            query_file.write(query)

        # Increment the query ID for the next query
        increment_id(current_id)

        return jsonify(success=True, id=current_id)
    except Exception as e:
        return jsonify(success=False, error=str(e))


@app_query.route('/checkDatabasePresence', methods=['GET'])
def checkDatabasePresence():


    response = "yes" 
    connection = None
    try:

        connection=psycopg2.connect(
            user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
        )

        print('Database connected.')

    except:
        print('Database not connected.')

    if connection is not None:
        connection.autocommit = True

        cur = connection.cursor()

        cur.execute("SELECT datname FROM pg_database;")

        list_database = cur.fetchall()

        database_name = session["databaseName"]

        if (database_name,) in list_database:
            print("'{}' Database already exist".format(database_name))
            response = "yes"
        else:
            print("'{}' Database not exist.".format(database_name))
            #createDatabase(session["databaseName"])
            #applyDbSchema(session["databaseName"])
            response = "no"
        connection.close()
        # print('Done')

        return jsonify({"presence":response}) 
    
    else:
        return jsonify({"presence":"error connection"}) 

p=None

@app_query.route('/translation1', methods=['GET'])
def translation1():
    global p
    #p=Process(target=queryDb)
    #p.start()
    queryDb()

    return("done")

@app_query.route('/translation2', methods=['GET'])
def translation2():
    global p
    createDatabase(session["databaseName"])
    applyDbSchema(session["databaseName"])
    #p=Process(target=queryDb)
    queryDb()

    #p.start()

    return("done")

@app_query.route('/checkTranslationEnd', methods=['GET'])
def checkTranslationEnd():
    if(p==None):
        return "false"

    if(p.is_alive()):
        return "true"
    else:
        return "false"

@app_query.route('/createEventLog', methods=["GET"])
def createEventLog():

    #database = 'TestDB'
    #global databaseName
    #database = 'datacloud' 
    #username = 'sa'
    #cnxn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+ password)
    #cnxn = pyodbc.connect('DRIVER={Devart ODBC Driver for PostgreSQL};Server='+server+';Database='+database+';User ID='+username+';Password='+password+';String Types=Unicode')
    
    #establishing the connection
    cnxn = psycopg2.connect(
        database=session["databaseName"], user=databaseFunctions.usernameDB, password=databaseFunctions.passwordDB, host=databaseFunctions.serverDB, port= databaseFunctions.portDB
    )

    cursor = cnxn.cursor()

    ##Sample select query DROP TABLE IF EXISTS log;
    cursor.execute("DROP TABLE IF EXISTS log_db CASCADE;")
    cursor.execute("select e.trace_id, e.name as event_name, e.time, a.key, eha.value into log_db \
                    from attribute a, event e, event_has_attribute eha \
                    where e.id=eha.event_id and a.id=eha.attr_id") 
    cursor.close()

    array=['trace_id', 'event_name', 'time', 'key', 'value' ]

    return jsonify({"campi":array}) 
    


@app_query.route('/deleteQueries/<int:id>', methods=['DELETE'])
def delete_queries(id):
    try:
        # Define the folder path where the files are stored
        folder_path = process_string("api/query_personalized")  # Update with the correct folder path

        # Create file paths
        description_file = os.path.join(folder_path, f'description_{id}.txt')
        query_file = os.path.join(folder_path, f'query_{id}.sql')

        # Delete the files if they exist
        if os.path.exists(description_file):
            os.remove(description_file)
        if os.path.exists(query_file):
            os.remove(query_file)

        return jsonify({'message': f'Query {id} deleted successfully!'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
