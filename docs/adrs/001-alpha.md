# Title
ADR-001: Creating new test web server.

# Date
12-07-2016

# Summary
This is a cross-platform web server for testing the youmayplay widget.

# Context
While there are web servers available to download and install on individual developer machines, different operating system platforms require different steps to install and set up. Also not all developers are savvy with configuring a web server. We (Lifecorp) also do not have the resources needed to support all of those web servers in the wild. What is needed is one webserver that is simple to set up on any platform that Lifecorp can reasonably maintain.

# Decision
We will develop our own web server application that developers can install on their machine and run locally specifically for the purpose of testing the youmayplay widget.

# Consequences
We will be able to compile a Go source to a single executable, but we will have to learn the best methods for writing and debugging a Go app.

# Status
Accepted