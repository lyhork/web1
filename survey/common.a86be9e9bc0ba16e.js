"use strict";(self.webpackChunkpos=self.webpackChunkpos||[]).push([[592],{1466:(a,o,s)=>{s.d(o,{u:()=>u});var e=s(529),h=s(2340),n=s(4650);let u=(()=>{class r{constructor(t){this.http=t,this.url=h.N.apiUrl,this.httpOptions={headers:(new e.WM).set("Content-Type","application/json")}}read(){return this.http.get(this.url+"/regulators",this.httpOptions)}delete(t=0){return this.http.delete(this.url+"/regulators/"+t,this.httpOptions)}create(t={}){return this.http.post(this.url+"/regulators",t,this.httpOptions)}update(t=0,p={}){return this.http.post(this.url+"/regulators/"+t,p,this.httpOptions)}changeStatus(t=0){return this.http.post(this.url+"/regulators/"+t+"/change-status",this.httpOptions)}}return r.\u0275fac=function(t){return new(t||r)(n.LFG(e.eN))},r.\u0275prov=n.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);