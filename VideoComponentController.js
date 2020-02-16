({
    doInit : function(component, event, helper) {
        //alert('inside init');
        var action= component.get('c.fetchContentDocs');
        action.setCallback(this, function(response){
            var state= response.getState();
            console.log('state::::::',state);
            if(state === 'SUCCESS'){
                var responseValue= response.getReturnValue();
                console.log('Response Value:::::', responseValue);
                component.set('v.contentDocumentList', responseValue);
            }
        });
        $A.enqueueAction(action); 
    },
    
    doSelectTitle: function(component,event,helper){
        //  alert('enters inside:::');
        component.set('v.selectFlag', true);
        component.set("v.selectedDocumentId" , event.currentTarget.getAttribute("data-Id")); 
        component.set('v.selectedCourseTitle', event.currentTarget.getAttribute("data-name"));
    },
    
    closeModel: function(component,event,helper){
        component.set("v.hasModalOpen", false);
        component.set("v.selectedDocumentId" , null); 
        var ele= document.getElementsByClassName('slds-file__crop');
        ele[0].style.display = 'none';
    },
    
    enrollSelection: function(component,event,helper){
        var coValue= event.getSource().get('v.value');
        console.log('coValue::::',coValue);
         component.set('v.selectedCourseTitle', coValue);
        var modalBody;
        $A.createComponent("c:ModalEnrollComponent", {
            userName: 'Sai Bharathwaj',
            courseName: component.get('v.selectedCourseTitle'),
            emailDetails: component.get('v.emailDetails')
        },
                           function(content, status){
                               if(status === 'SUCCESS'){
                                   modalBody=content;
                                   component.find('overlayLib').showCustomModal({
                                       header: 'Enroll Information',
                                       body: modalBody,
                                       showCloseButton: true,
                                       cssClass : 'myModal',
                                       closeCallback: function(){
                                           alert('You Closed the Alert !!!!!');
                                       }
                                   })
                               }
                           }
                          );
    }
})