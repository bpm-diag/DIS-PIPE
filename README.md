<p align="center"><img width=50% src="https://github.com/DataCloud-project/DIS-PIPE/blob/main/DISPIPE_Logo_TransparentBackground_White.png"></p> 

<!---[![GitHub Issues](https://img.shields.io/github/issues/DataCloud-project/SIM-PIPE.svg)](https://github.com/DataCloud-project/SIM-PIPE/issues)--->

[![License](https://img.shields.io/badge/license-Apache2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# DIS-PIPE

DIS-PIPE provides scalable integration of **process mining** techniques and **artificial intelligence** algorithms to learn the structure of **Big Data pipelines** by extracting, processing, and interpreting vast amounts of event data collected from several data sources. Furthermore, DIS-PIPE supports a variety of analytics techniques for visualizing the discovered pipelines together with detailed diagnostics information about their execution.

The tool includes a frontend with a GUI written in HTML, Javascript and CSS, and a backend that exposes a Python Flask web application to receive the results of pipeline discovery on the base of user inputs.

<p align="center">
    <img src="https://raw.githubusercontent.com/bpm-diag/DIS-PIPE/main/images/DISPIPEarchitecture.png">
</p>

The DIS-PIPE components include:

<!-- - *Event data extraction*: which analyzes data sources to detect the main constituents of a data pipeline execution [DONE]; -->
<!-- - *Segmentation*: which clusters together the events belonging to the same pipeline executions [DONE]; -->
<!-- - *Abstraction*: which reduces the complexity of the event data set by merging multiple events into larger ones [DONE]; -->
- *Filtering*: which removes potential outliers and infrequent events from the data set;
- *Pipeline discovery*: which learns the structure of a data pipeline by interpreting an event log generated by applying the previous functionalities over the event data set;
- *Pipeline map visualization*: providing an understandable flowchart view of a discovered pipeline, which facilitates the analysis of execution metrics, such as duration, frequent paths, or exceptional behaviors;
- *Event log analysis*: which enables inspecting the history of relevant pipeline executions collected in the event log and understanding specific aspects, including timeframe, variation, attributes, event relationships, and many more;
- *Conformance checking*: of the pipeline executions as observed into the event log with the organization’s business rules, policies, and regulations;
- *Anomaly detection*: which interprets the conformance checking outcomes signaling nonconforming deviations and providing repair solutions;
- *Dark data discovery*: which use the query functionality to give value to data involved in pipeline executions.


## Requirements
To use the tool, you need to have installed docker on your machine.

## To use the code
1. Download the [docker-compose.yml](https://github.com/bpm-diag/DIS-PIPE/blob/main/docker-compose.yml) file in your personal folder. 
2. Open the terminal in the folder where you have downloaded the file.
4. Run: ``docker compose up``;
5. Go to your browser on http://localhost:7778/ or http://127.0.0.1:7778/

## User Guide

See the [example](https://github.com/bpm-diag/DIS-PIPE/tree/main/example) folder for instructions on how to run your first data pipeline discovery.



## Core development team

* [Simone Agostinelli](https://github.com/SimoneONE)
* [Jacopo Rossi](https://github.com/JacopoRossi)
* [Andrea Marrella](https://github.com/and182)
* [Dario Benvenuti](https://github.com/d-benvenuti)

## License

DIS-PIPE is released as open source software under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
